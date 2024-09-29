function getUserLanguage() {
  return navigator.language || navigator.userLanguage;
}

function setLanguage(lang) {
  const elements = document.querySelectorAll('[data-en][data-zh]');
  elements.forEach(el => {
    if (lang.startsWith('zh')) {
      el.textContent = el.getAttribute('data-zh');
    } else {
      el.textContent = el.getAttribute('data-en');
    }
  });
  
  // 更新保存地址按钮的文本
  const saveBtn = document.getElementById('saveBtn');
  saveBtn.textContent = lang.startsWith('zh') ? '保存地址' : 'Save Address';
  
  // 重新渲染保存的地址以更新语言
  renderSavedAddresses(lang);
  
  // 更新国家选择列表
  const countrySelect = document.getElementById('country');
  Array.from(countrySelect.options).forEach(option => {
    const country = countries.find(c => c.code === option.value);
    if (country) {
      option.textContent = lang.startsWith('zh') ? country.nameZh : country.nameEn;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const refreshBtn = document.getElementById('refreshBtn');
  const saveBtn = document.getElementById('saveBtn');
  const countrySelect = document.getElementById('country');

  const userLang = getUserLanguage();
  setLanguage(userLang);

  refreshBtn.addEventListener('click', () => {
    const selectedCountry = countrySelect.value;
    fetchAddress(selectedCountry); // 传递选定的国家代码
  });

  saveBtn.addEventListener('click', showModal);

  countrySelect.addEventListener('change', (event) => {
    fetchAddress(event.target.value);
  });

  populateCountryOptions();
  fetchAddress('RANDOM'); // 初始加载时使用随机国家
  renderSavedAddresses(userLang); // 确保初始加载时使用正确的语言
});

async function fetchAddress(country = '') {
  try {
    if (country === 'RANDOM') {
      const countries = ["US", "UK", "FR", "DE", "CN", "TW", "HK", "JP", "IN", "AU", "BR", "CA", "RU", "ZA", "MX", "KR", "IT", "ES", "TR", "SA", "AR", "EG", "NG", "ID"];
      country = countries[Math.floor(Math.random() * countries.length)];
    }
    const response = await fetch(`/api/address?country=${country}`);
    const data = await response.json();
    updateUI(data);  // 确保这里调用的是 updateUI
  } catch (error) {
    console.error('Error fetching address:', error);
  }
}

function updateUI(data) {
  document.querySelector('#name span').textContent = data.name;
  document.querySelector('#gender span').textContent = data.gender;
  document.querySelector('#phone span').textContent = data.phone;
  document.querySelector('#address span').textContent = data.address;
  
  // 更新地图
  document.getElementById('map').src = `https://www.google.com/maps?q=${encodeURIComponent(data.address)}&output=embed`;
}

function copyToClipboard(element) {
  const textToCopy = element.querySelector('span').textContent;
  navigator.clipboard.writeText(textToCopy).then(() => {
    showCopiedMessage();
  }).catch(err => {
    console.error('无法复制文本: ', err);
  });
}

function saveAddress(note = '') {
  const lang = getUserLanguage();
  const promptText = lang.startsWith('zh') ? '请输入备注（可以留空）' : 'Please enter a note (can be left blank)';
  const noteInput = document.getElementById('addressNote');
  const noteValue = noteInput.value || '';
  const savedAddresses = JSON.parse(localStorage.getItem('savedAddresses') || '[]');
  const newEntry = {
    note: noteValue,
    name: document.getElementById('name').textContent,
    gender: document.getElementById('gender').textContent,
    phone: document.getElementById('phone').textContent.replace(/[()\\s-]/g, ''),
    address: document.getElementById('address').textContent
  };
  savedAddresses.push(newEntry);
  localStorage.setItem('savedAddresses', JSON.stringify(savedAddresses));
  renderSavedAddresses(lang); // 修改这里，传递语言参数
}

function renderSavedAddresses(lang) {
  const savedAddresses = JSON.parse(localStorage.getItem('savedAddresses') || '[]');
  const tbody = document.getElementById('savedAddressesTable').getElementsByTagName('tbody')[0];
  tbody.innerHTML = '';
  savedAddresses.forEach((entry, index) => {
    const row = tbody.insertRow();
    const deleteCell = row.insertCell();
    const noteCell = row.insertCell();
    const nameCell = row.insertCell();
    const genderCell = row.insertCell();
    const phoneCell = row.insertCell();
    const addressCell = row.insertCell();

    const deleteBtn = createDeleteButton(index);
    deleteCell.appendChild(deleteBtn);

    noteCell.textContent = entry.note;
    nameCell.textContent = entry.name;
    genderCell.textContent = entry.gender;
    phoneCell.textContent = entry.phone;
    addressCell.textContent = entry.address;

    // 为每个单元格添加点击事件监听器
    [noteCell, nameCell, genderCell, phoneCell, addressCell].forEach(cell => {
      cell.style.cursor = 'pointer';
      cell.addEventListener('click', function() {
        copyToClipboard(this.textContent);
      });
    });
  });
}

function updateDeleteButtonsText(lang) {
  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach(btn => {
    btn.textContent = '✖';
  });
}

function populateCountryOptions() {
  const countries = [
    { nameEn: "Random", nameZh: "随机", code: "RANDOM" },
    { nameEn: "United States", nameZh: "美国", code: "US" },
    { nameEn: "United Kingdom", nameZh: "英国", code: "UK" },
    { nameEn: "France", nameZh: "法国", code: "FR" },
    { nameEn: "Germany", nameZh: "德国", code: "DE" },
    { nameEn: "China", nameZh: "中国", code: "CN" },
    { nameEn: "Taiwan", nameZh: "中国台湾", code: "TW" },
    { nameEn: "Hong Kong", nameZh: "中国香港", code: "HK" },
    { nameEn: "Japan", nameZh: "日本", code: "JP" },
    { nameEn: "India", nameZh: "印度", code: "IN" },
    { nameEn: "Australia", nameZh: "澳大利亚", code: "AU" },
    { nameEn: "Brazil", nameZh: "巴西", code: "BR" },
    { nameEn: "Canada", nameZh: "加拿大", code: "CA" },
    { nameEn: "Russia", nameZh: "俄罗斯", code: "RU" },
    { nameEn: "South Africa", nameZh: "南非", code: "ZA" },
    { nameEn: "Mexico", nameZh: "墨西哥", code: "MX" },
    { nameEn: "South Korea", nameZh: "韩国", code: "KR" },
    { nameEn: "Italy", nameZh: "意大利", code: "IT" },
    { nameEn: "Spain", nameZh: "西班牙", code: "ES" },
    { nameEn: "Turkey", nameZh: "土耳其", code: "TR" },
    { nameEn: "Saudi Arabia", nameZh: "沙特阿拉伯", code: "SA" },
    { nameEn: "Argentina", nameZh: "阿根廷", code: "AR" },
    { nameEn: "Egypt", nameZh: "埃及", code: "EG" },
    { nameEn: "Nigeria", nameZh: "尼日利亚", code: "NG" },
    { nameEn: "Indonesia", nameZh: "印度尼西亚", code: "ID" }
  ];

  const select = document.getElementById('country');
  const lang = getUserLanguage();

  countries.forEach(({ nameEn, nameZh, code }) => {
    const option = document.createElement('option');
    option.value = code;
    option.textContent = lang.startsWith('zh') ? nameZh : nameEn;
    select.appendChild(option);
  });

  // 设置默认选项为"随机"
  select.value = "RANDOM";
}

function populateCountrySelect() {
  const countrySelect = document.getElementById('country');
  const currentLanguage = getCurrentLanguage();

  countries.forEach(country => {
    const option = document.createElement('option');
    option.value = country.code;
    option.textContent = currentLanguage === 'zh' ? country.nameZh : country.nameEn;
    countrySelect.appendChild(option);
  });
}

// 为可点击元素添加事件监听器
document.getElementById('name').addEventListener('click', function() {
  copyToClipboard(this);
});
document.getElementById('gender').addEventListener('click', function() {
  copyToClipboard(this);
});
document.getElementById('phone').addEventListener('click', function() {
  copyToClipboard(this);
});
document.getElementById('address').addEventListener('click', function() {
  copyToClipboard(this);
});

function updateInfo(data) {
  document.querySelector('#name span').textContent = data.name;
  document.querySelector('#gender span').textContent = data.gender;
  document.querySelector('#phone span').textContent = data.phone;
  document.querySelector('#address span').textContent = data.address;

  // 更新地图
  updateMap(data.address);
}

function createDeleteButton(index) {
  const deleteButton = document.createElement('button');
  deleteButton.textContent = '✖';
  deleteButton.classList.add('delete'); // 添加 'delete' 类
  deleteButton.addEventListener('click', () => deleteAddress(index));
  return deleteButton;
}

function deleteAddress(index) {
  const savedAddresses = JSON.parse(localStorage.getItem('savedAddresses') || '[]');
  savedAddresses.splice(index, 1);
  localStorage.setItem('savedAddresses', JSON.stringify(savedAddresses));
  renderSavedAddresses(getUserLanguage());
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showCopiedMessage();
  }).catch(err => {
    console.error('无法复制文本: ', err);
  });
}

function showCopiedMessage() {
  const copiedMessage = document.getElementById('copied');
  copiedMessage.style.display = 'block';
  setTimeout(() => {
    copiedMessage.style.display = 'none';
  }, 2000);
}

// 获取弹窗相关的元素
const saveAddressModal = document.getElementById('saveAddressModal');
const saveBtn = document.getElementById('saveBtn');
const confirmSaveBtn = document.getElementById('confirmSaveBtn');
const cancelSaveBtn = document.getElementById('cancelSaveBtn');
const addressNoteInput = document.getElementById('addressNote');

// 显示弹窗
function showModal() {
  saveAddressModal.style.display = 'block';
}

// 隐藏弹窗
function hideModal() {
  saveAddressModal.style.display = 'none';
  addressNoteInput.value = ''; // 清空输入框
}

// 保存按钮点击事件
saveBtn.addEventListener('click', showModal);

// 取消按钮点击事件
cancelSaveBtn.addEventListener('click', hideModal);

// 确认保存按钮点击事件
confirmSaveBtn.addEventListener('click', () => {
  const note = addressNoteInput.value;
  saveAddress(note);
  hideModal();
});

// 修改保存地址的函数
function saveAddress(note = '') {
  const lang = getUserLanguage();
  const promptText = lang.startsWith('zh') ? '请输入备注（可以留空）' : 'Please enter a note (can be left blank)';
  const noteInput = document.getElementById('addressNote');
  const noteValue = noteInput.value || '';
  const savedAddresses = JSON.parse(localStorage.getItem('savedAddresses') || '[]');
  const newEntry = {
    note: noteValue,
    name: document.getElementById('name').textContent,
    gender: document.getElementById('gender').textContent,
    phone: document.getElementById('phone').textContent.replace(/[()\\s-]/g, ''),
    address: document.getElementById('address').textContent
  };
  savedAddresses.push(newEntry);
  localStorage.setItem('savedAddresses', JSON.stringify(savedAddresses));
  renderSavedAddresses(lang); // 修改这里，传递语言参数
}
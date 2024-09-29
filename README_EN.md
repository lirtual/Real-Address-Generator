# Real Address Generator

[中文](README.md) / English

## Demo

![](https://github.com/lirtual/Real-Address-Generator/blob/main/example.png)

Use online: [https://real-address-generator-3li.pages.dev/](https://real-address-generator-3li.pages.dev/)

## Features

- Generate random real address information, including name, gender, phone number, and detailed address
- Support address generation for multiple countries
- Visualize generated address location on a map
- Save and manage generated addresses
- Support bilingual interface in Chinese and English

## Tech Stack

- HTML5
- CSS3
- JavaScript (vanilla)
- Google Fonts
- Font Awesome icon library

## Usage Instructions

1. Open the `index.html` file in a browser to run the application
2. Select the desired country from the dropdown menu
3. Click the "Generate Address" button to get a new random address
4. Click the "Save Address" button and add a note to save the current address
5. View and manage saved addresses in the table

## Project Structure

- `index.html`: Main HTML structure
- `styles.css`: Stylesheet file
- `script.js`: JavaScript logic code
- `functions/api/address.js`: Backend API function (for address generation)

## Deployment Instructions (Cloudflare Pages)

1. Ensure your project is pushed to a GitHub repository.

2. Log in to your Cloudflare account and go to the "Pages" section.

3. Click the "Create Project" button.

4. Choose the "Connect to Git" option, then select the GitHub repository containing your project.

5. On the configuration page:
   - Set the project name
   - Select `main` or your main branch for the production branch
   - Build settings:
     - Build command: leave blank (as this is a static website)
     - Build output directory: leave blank or enter `/`

6. Click "Save and Deploy".

7. Cloudflare Pages will automatically deploy your website. Once deployment is complete, you'll receive a `*.pages.dev` URL.

8. (Optional) If you want to use a custom domain, you can add and configure your domain in the project settings.

Note: If your project uses environment variables (such as API keys), please add these variables in the "Environment Variables" section of your Cloudflare Pages project settings.

## Customization

You can customize the appearance of the application by modifying the `styles.css` file, or edit `script.js` to adjust the functional logic.

## Contributions

Issues and pull requests are welcome to improve this project.

## License

This project is licensed under the MIT License.

## Copyright Notice

The initial version is from chatgpt.org.uk, modified by lirtual.
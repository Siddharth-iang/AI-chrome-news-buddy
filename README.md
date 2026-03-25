# AI Chrome News Buddy

A Chrome extension that uses Google's Gemini AI to summarize web articles and news pages instantly.

## Features

- **Smart Text Extraction**: Automatically extracts article content from any webpage
- **Multiple Summary Types**: Choose from brief, detailed, or bullet-point summaries
- **Powered by Gemini AI**: Uses Google's Gemini 1.5 Flash model for fast, accurate summaries
- **One-Click Copy**: Easily copy summaries to your clipboard
- **Clean Interface**: Simple, intuitive popup design

## Installation

### From Source

1. Clone this repository:
```bash
git clone https://github.com/Siddharth-iang/AI-chrome-news-buddy.git
```

2. Get a Gemini API key:
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the key

3. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (top right)
   - Click "Load unpacked"
   - Select the extension folder

4. Configure your API key:
   - Click the extension icon
   - Go to extension options (right-click icon → Options)
   - Paste your Gemini API key
   - Save

## Usage

1. Navigate to any article or news page
2. Click the extension icon in your toolbar
3. Select your preferred summary type:
   - **Brief**: 2-3 sentence overview
   - **Detailed**: Comprehensive summary with all key points
   - **Bullets**: 5-7 key points in list format
4. Click "Summarize This Page"
5. Wait a few seconds for the AI to generate your summary
6. Click "Copy Summary" to copy the text to your clipboard

## Files Structure

```
├── manifest.json       # Extension configuration
├── popup.html          # Extension popup UI
├── popup.js            # Popup logic and Gemini API integration
├── content.js          # Content script for text extraction
├── background.js       # Background service worker
├── options.html        # Options page for API key setup
├── icon.png            # Extension icon
└── README.md           # This file
```

## How It Works

1. **Content Extraction**: The content script (`content.js`) extracts text from the current webpage by looking for `<article>` tags or collecting all paragraph text
2. **API Communication**: The popup script (`popup.js`) sends the extracted text to Google's Gemini API with your chosen summary type
3. **AI Processing**: Gemini processes the text and returns a formatted summary
4. **Display**: The summary is displayed in the popup with options to copy

## Requirements

- Chrome browser (version 88+)
- Google Gemini API key (free tier available)
- Internet connection

## Privacy

- Your API key is stored locally in Chrome's sync storage
- Article text is sent to Google's Gemini API for processing
- No data is stored or transmitted to any other servers

## Troubleshooting

**"API key not found" error**
- Make sure you've set your API key in the extension options

**"Couldn't extract text from this page"**
- The page might not have standard article formatting
- Try a different page or article

**"Failed to generate summary"**
- Check your internet connection
- Verify your API key is valid
- Check if you've exceeded your API quota

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Author

Created by Siddharth

## Acknowledgments

- Powered by [Google Gemini AI](https://ai.google.dev/)
- Built with Chrome Extension Manifest V3

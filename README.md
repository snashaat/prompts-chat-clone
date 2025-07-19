# Prompts Chat Clone

A full working clone of the prompts.chat website - a modern prompt directory platform that allows users to browse, search, and filter AI prompts for various platforms like ChatGPT, Claude, Grok, and more.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://your-username.github.io/prompts-chat-clone)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue)](https://hub.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-orange)](https://pages.github.com/)

## 🌟 Features

- **Modern Dark UI**: Clean, responsive design with a dark theme matching the original
- **Multi-Platform Support**: Filter prompts by AI platform (ChatGPT, Claude, Grok, etc.)
- **Category Filtering**: Browse prompts by category (Developer, Writer, Designer, etc.)
- **Real-time Search**: Instant search functionality across titles, descriptions, and content
- **Prompt Details Modal**: Click any prompt to view full details in a modal
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Error Handling**: Graceful error handling with user-friendly messages
- **Performance Optimized**: Fast loading with efficient filtering and rendering

## 🏗️ Project Structure

```
prompts-chat-clone/
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   └── styles.css      # All styling and responsive design
│   ├── js/
│   │   └── app.js          # JavaScript functionality
│   └── data/
│       └── prompts.json    # Sample prompts data
├── Dockerfile              # Docker configuration
└── README.md              # This file
```

## 🚀 Quick Start

### GitHub Deployment (Recommended)

1. **Fork or Clone this repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/prompts-chat-clone.git
   cd prompts-chat-clone
   ```

2. **Push to your GitHub repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Complete prompts.chat clone"
   git remote add origin https://github.com/YOUR_USERNAME/prompts-chat-clone.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Select "Deploy from a branch" → "main" → "/ (root)"
   - Your site will be live at: `https://YOUR_USERNAME.github.io/prompts-chat-clone`

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/prompts-chat-clone.git
   cd prompts-chat-clone
   ```

2. **Serve the files using a local web server**
   
   **Option A: Using Python (if installed)**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```
   
   **Option B: Using Node.js (if installed)**
   ```bash
   npx http-server -p 8000
   ```
   
   **Option C: Using VSCode Live Server extension**
   - Install the "Live Server" extension in VSCode
   - Right-click on `index.html` and select "Open with Live Server"

3. **Open your browser and navigate to:**
   ```
   http://localhost:8000
   ```

## 🐳 Docker Deployment

### Prerequisites
- Docker installed on your system
- Basic familiarity with Docker commands

### Build and Run

1. **Build the Docker image:**
   ```bash
   docker build -t prompts-chat .
   ```

2. **Run the Docker container:**
   ```bash
   docker run -d -p 8000:80 --name prompts-chat-app prompts-chat
   ```

3. **Access the application:**
   Open your web browser and navigate to:
   ```
   http://localhost:8000
   ```

### Docker Hub Deployment

1. **Tag and push to Docker Hub:**
   ```bash
   docker tag prompts-chat YOUR_USERNAME/prompts-chat:latest
   docker push YOUR_USERNAME/prompts-chat:latest
   ```

2. **Pull and run from Docker Hub:**
   ```bash
   docker pull YOUR_USERNAME/prompts-chat:latest
   docker run -d -p 8000:80 YOUR_USERNAME/prompts-chat:latest
   ```

### Docker Management Commands

**Stop the container:**
```bash
docker stop prompts-chat-app
```

**Start the container:**
```bash
docker start prompts-chat-app
```

**Remove the container:**
```bash
docker rm prompts-chat-app
```

**Remove the image:**
```bash
docker rmi prompts-chat
```

**View container logs:**
```bash
docker logs prompts-chat-app
```

**View running containers:**
```bash
docker ps
```

## 🔧 Configuration

### Adding New Prompts

To add new prompts, edit the `assets/data/prompts.json` file. Each prompt should follow this structure:

```json
{
  "id": 1,
  "title": "Prompt Title",
  "description": "Brief description for the card",
  "category": "developer",
  "platforms": ["chatgpt", "claude", "grok"],
  "prompt": "The full prompt text that will be displayed in the modal",
  "contributor": "username"
}
```

**Available Categories:**
- `developer`
- `writer` 
- `designer`
- `academician`
- `accountant`
- `advertiser`
- `accessibility-auditor`
- `acoustic-guitar-composer`

**Available Platforms:**
- `chatgpt`
- `claude`
- `grok`
- `github-copilot`
- `perplexity`
- `mistral`
- `gemini`
- `meta`

### Customizing the Design

The entire design can be customized by modifying `assets/css/styles.css`. The CSS uses CSS custom properties (variables) for easy theming:

```css
:root {
    --primary-bg: #0f1419;
    --secondary-bg: #1a1f2e;
    --accent-green: #00d4aa;
    --text-primary: #ffffff;
    /* ... more variables */
}
```

## 🧪 Testing the Functionality

### Manual Testing Checklist

1. **Homepage Loading**
   - [ ] Page loads without errors
   - [ ] All prompt cards are displayed
   - [ ] Header and navigation are visible

2. **Search Functionality**
   - [ ] Type in search box filters prompts in real-time
   - [ ] Search works across titles, descriptions, and content
   - [ ] Empty search shows all prompts

3. **Platform Filtering**
   - [ ] Clicking platform buttons filters prompts
   - [ ] Active platform button is highlighted
   - [ ] "All Prompts" shows all prompts

4. **Category Filtering**
   - [ ] Clicking category buttons filters prompts
   - [ ] Active category button is highlighted
   - [ ] Category counts are accurate

5. **Prompt Modal**
   - [ ] Clicking a prompt card opens the modal
   - [ ] Modal displays full prompt text
   - [ ] Close button (×) closes the modal
   - [ ] Clicking outside modal closes it
   - [ ] ESC key closes the modal

6. **Responsive Design**
   - [ ] Layout works on desktop (1200px+)
   - [ ] Layout works on tablet (768px-1199px)
   - [ ] Layout works on mobile (320px-767px)
   - [ ] Navigation adapts to smaller screens

7. **Error Handling**
   - [ ] Graceful handling if prompts.json fails to load
   - [ ] "No prompts found" message when filters return no results

## 🐛 Troubleshooting

### Common Issues

**1. Prompts not loading**
- Check browser console for errors
- Ensure `assets/data/prompts.json` exists and is valid JSON
- Verify the web server is serving JSON files correctly

**2. Search not working**
- Check browser console for JavaScript errors
- Ensure the search input has the correct ID (`searchInput`)

**3. Modal not opening**
- Check that prompt cards have the correct `data-id` attributes
- Verify modal HTML structure is correct

**4. Docker container not starting**
- Check if port 8000 is already in use: `docker ps`
- Try using a different port: `docker run -d -p 8080:80 prompts-chat`

**5. Styling issues**
- Ensure `assets/css/styles.css` is loading correctly
- Check browser developer tools for CSS errors
- Verify Google Fonts are loading

### Browser Compatibility

- **Chrome**: 70+
- **Firefox**: 65+
- **Safari**: 12+
- **Edge**: 79+

## 📝 Development Notes

### Architecture Decisions

1. **Vanilla JavaScript**: No frameworks used for maximum compatibility and minimal dependencies
2. **CSS Grid/Flexbox**: Modern layout techniques for responsive design
3. **JSON Data**: Simple file-based data storage for easy modification
4. **Nginx**: Lightweight web server for production deployment

### Performance Optimizations

1. **Debounced Search**: Search input is debounced to prevent excessive filtering
2. **Efficient Filtering**: Multiple filters are applied in a single pass
3. **CSS Animations**: Hardware-accelerated transitions for smooth interactions
4. **Image Optimization**: No external images used, only CSS-based styling

### Security Considerations

1. **XSS Prevention**: All user-generated content is escaped before rendering
2. **CORS Headers**: Proper CORS configuration for API requests
3. **Content Security**: No inline scripts or styles

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 🌐 Deployment Options

### GitHub Pages (Free)
- **Setup**: Enable in repository settings
- **URL**: `https://username.github.io/prompts-chat-clone`
- **Best for**: Personal projects, portfolios

### Netlify (Free tier available)
- **Setup**: Connect GitHub repository
- **Features**: Custom domains, form handling, serverless functions
- **Best for**: Production websites

### Vercel (Free tier available)
- **Setup**: Import from GitHub
- **Features**: Edge functions, analytics, custom domains
- **Best for**: Modern web applications

### Railway (Docker deployment)
- **Setup**: Connect repository with Dockerfile
- **Features**: Automatic deployments, databases, custom domains
- **Best for**: Full-stack applications

See [GITHUB_DEPLOYMENT.md](GITHUB_DEPLOYMENT.md) for detailed deployment instructions.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Original inspiration from [prompts.chat](https://prompts.chat/)
- Built with vanilla HTML, CSS, and JavaScript
- Containerized with Docker and Nginx
- Deployed using modern web platforms

## 📞 Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Review [GITHUB_DEPLOYMENT.md](GITHUB_DEPLOYMENT.md) for deployment help
3. Check browser console for errors
4. Ensure all files are present and correctly structured
5. Verify Docker is running correctly (for Docker deployment)

## ⭐ Show Your Support

If this project helped you, please consider giving it a ⭐ on GitHub!

---

**Enjoy your prompts directory! 🚀**

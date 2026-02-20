# 📋 Task Manager - React Application

A modern, responsive task management application built with React.js and deployed on GitHub Pages.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![GitHub Pages](https://img.shields.io/badge/deployed-GitHub%20Pages-success)

<img width="1876" height="833" alt="image" src="https://github.com/user-attachments/assets/51b449a3-e290-4dfd-b290-4b25a360f28f" />

<br/>
<img width="1887" height="784" alt="image" src="https://github.com/user-attachments/assets/fb81e16e-bd67-46f0-88c6-de07c6977581" />




## 🌟 Features

- ✅ **Create Tasks** - Add tasks with title and optional description
- 📊 **Progress Tracking** - Visual progress bars showing task completion (0%, 50%, 100%)
- 🎯 **Status Management** - Three status levels: Pending, In Progress, Completed
- 📅 **Automatic Timestamps** - Created and completion dates tracked automatically
- 🔍 **Filter Tasks** - Filter by All, Pending, In Progress, or Completed
- 💾 **Persistent Storage** - Uses localStorage to save your tasks
- 🎨 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🗑️ **Delete Tasks** - Remove tasks you no longer need

## 🚀 Live Demo

Visit the live application: [/MaMohm/ToDoListReact.git](https://mamohm.github.io/ToDoListReact/)

## 🛠️ Technologies Used

- **React.js** - Frontend framework
- **Tailwind CSS** - Styling via CDN
- **Lucide React** - Icon library
- **localStorage API** - Client-side data persistence
- **GitHub Pages** - Hosting and deployment

## 📦 Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

### Setup Instructions

1. **Clone the repository**
```bash
   git clone https://github.com/MaMohm/ToDOList_React.git
   cd ToDOList_React
```

2. **Install dependencies**
```bash
   npm install
```

3. **Start the development server**
```bash
   npm start
```

4. **Open your browser**
   
   Navigate to `http://localhost:3000`

## 📁 Project Structure
```
todolist_react/
├── public/
│   ├── index.html          # Main HTML file with Tailwind CDN
│   └── manifest.json       # PWA manifest
├── src/
│   ├── App.js              # Main Task Manager component
│   ├── index.js            # React entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## 🎯 Data Model

Each task contains the following properties:
```javascript
{
  id: "unique-timestamp-id",
  title: "Task title",
  description: "Optional description",
  status: "Pending" | "In Progress" | "Completed",
  createdAt: "2026-01-21T10:30:00.000Z",
  completedAt: "2026-01-21T15:45:00.000Z" | null
}
```

## 🚀 Deployment

### Deploy to GitHub Pages

1. **Install gh-pages**
```bash
   npm install gh-pages --save-dev
```

2. **Update package.json**
   
   Add the homepage field:
```json
   "homepage": "https://MaMohm.github.io/ToDOList_React"
```

3. **Deploy**
```bash
   npm run deploy
```

4. **Configure GitHub Pages**
   - Go to repository Settings → Pages
   - Set source to `gh-pages` branch
   - Save

Your app will be live at: `https://MaMohm.github.io/ToDOList_React`

## 📝 Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm run build`
Builds the app for production to the `build` folder

### `npm run deploy`
Builds and deploys the app to GitHub Pages

## 🎨 Usage Guide

### Creating a Task
1. Click the **"New Task"** button
2. Enter a task title (required)
3. Add an optional description
4. Click **"Create Task"**

### Managing Task Status
- Click on status buttons to update: **Pending**, **In Progress**, **Completed**
- Progress bar automatically updates based on status
- Completion date is saved when marked as "Completed"

### Filtering Tasks
- Use filter buttons to view: **All Tasks**, **Pending**, **In Progress**, **Completed**

### Deleting Tasks
- Click the trash icon (🗑️) on any task to delete it

## 🔒 Data Privacy

- All data is stored locally in your browser using localStorage
- No data is sent to external servers
- Clearing browser data will remove all tasks

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**MaMohm**

- GitHub: [@MaMohm](https://github.com/MaMohm)
- Repository: [ToDOList_React](https://github.com/MaMohm/ToDOList_React)

## 🙏 Acknowledgments

- Icons by [Lucide Icons](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Built with [Create React App](https://create-react-app.dev/)

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on [GitHub Issues](https://github.com/MaMohm/ToDOList_React/issues)
- Check existing issues for solutions

---

⭐ **Star this repository if you find it helpful!**

# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/0d5c7955-aba5-47bb-bb32-a19a4efe429e

## Chatbot with n8n Webhook Integration

This project includes a chatbot widget that integrates with n8n workflows via webhooks. When users send messages, the chatbot sends POST requests to an n8n webhook URL and displays the responses in the chat interface.

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- n8n (running on `http://localhost:5678` for development)

### Setup and Run

1. **Clone the repository**
   ```bash
   git clone https://github.com/vince6699me/quantum-temp.git
   cd quantum-temp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up n8n webhook**
   - Ensure n8n is running on `http://localhost:5678`
   - Create a webhook node in your n8n workflow with the path `/webhook-test/chatbot`
   - Configure the workflow to process the incoming message and return a response

4. **Development server**
   ```bash
   npm run dev
   ```
   - Visit `http://localhost:5173` (default Vite dev server)
   - Open the chatbot widget in the bottom right
   - Send messages to trigger the webhook

### Building for Production

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Preview production build**
   ```bash
   npm run preview
   ```
   - Visit `http://localhost:4173` (default Vite preview)

### Webhook Configuration

The chatbot sends POST requests to `http://localhost:5678/webhook-test/chatbot` with the following payload:
```json
{
  "message": "user message text"
}
```

Expected webhook response format (array with text):
```json
[
  {
    "text": "Hello! How can I help you today?"
  }
]
```

The chatbot extracts the `text` field from the first array element and displays it as the bot response.

### Deployment Options

- **Lovable Platform**: Click Share -> Publish in the Lovable interface
- **Custom Server**: Deploy the built files (`dist/` folder) to any static hosting service
- **Vercel/Netlify**: Add build command `npm run build` and output directory `dist`
- **Custom Domain**: Configure in Lovable Project > Settings > Domains

### Development Notes

- Webhook URL is hardcoded for localhost; update `src/components/ChatWidget.tsx` for production use
- CORS may need to be handled if webhook is on a different domain
- Error handling included for failed webhook requests

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/0d5c7955-aba5-47bb-bb32-a19a4efe429e) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/0d5c7955-aba5-47bb-bb32-a19a4efe429e) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

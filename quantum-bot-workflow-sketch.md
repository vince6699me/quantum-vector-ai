# QuantumVector AI Customer Care Bot - Workflow Sketch

## Flowchart Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        TELEGRAM BOT WORKFLOW                                │
└─────────────────────────────────────────────────────────────────────────────┘

                           ┌──────────────────┐
                           │   TELEGRAM       │
                           │    TRIGGER       │
                           │  (Receives msg)  │
                           └────────┬─────────┘
                                    │
                                    ▼
                           ┌──────────────────┐
                           │   EXTRACT DATA   │
                           │  (Set Node)      │
                           │  - messageText   │
                           │  - chatType      │
                           │  - chatId        │
                           │  - userId        │
                           │  - userName      │
                           │  - userUsername  │
                           └────────┬─────────┘
                                    │
                                    ▼
                          ┌───────────────────┐
                          │   IS PRIVATE?    │
                          │   (Filter)       │
                          └────────┬──────────┘
                                   │
              ┌────────────────────┴────────────────────┐
              │                                         │
              ▼                                         ▼
     ┌─────────────────┐                     ┌──────────────────┐
     │   YES: PRIVATE  │                     │   NO: GROUP/     │
     │   (Filter)      │                     │   SUPERGROUP     │
     └────────┬────────┘                     └────────┬─────────┘
              │                                        │
              ▼                                        ▼
    ┌──────────────────┐                   ┌──────────────────┐
    │  Is /start?     │                   │ NOTIFY OWNER    │
    │  Is /help?      │                   │ (Group Message)  │
    │  Is /services?  │                   └────────┬─────────┘
    │  Is /pricing?   │                            │
    │  Is /contact?   │                            ▼
    │  Is /book?      │                   ┌──────────────────┐
    └────────┬───────┘                   │  PROCESS MESSAGE │
             │                            │  (Code Node)     │
             │                            │  - FAQ matching  │
             │                            │  - Intent detect │
             ▼                            └────────┬─────────┘
    ┌──────────────────────────────────────────────┴──────────────┐
    │                                                          │
    ▼                                                          ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐
│  COMMANDS   │  │   GREETING  │  │  HAS FAQ?   │  │ HAS BOOKING? │
│  (Filter)   │  │  (Filter)   │  │  (Filter)   │  │  (Filter)    │
└──────┬──────┘  └──────┬──────┘  └──────┬───────┘  └───────┬────────┘
       │                │                 │                   │
       │                │                 │                   │
       ▼                ▼                 ▼                   ▼
┌──────────────┐  ┌──────────────┐  ┌────────────┐   ┌───────────────┐
│  SEND RESP   │  │  SEND GREET  │  │SEND FAQ RESP│  │SEND BOOKING  │
│  (Telegram)  │  │ (Telegram)   │  │(Telegram)  │  │  PROMPT      │
└──────────────┘  └──────────────┘  └────────────┘  │  (Telegram)   │
                                                      └───────┬───────┘
                                                              │
                                                              ▼
                                                 ┌─────────────────────┐
                                                 │    HAS EMAIL?       │
                                                 │    (Filter)         │
                                                 └──────────┬──────────┘
                                                            │
                                                 ┌──────────┴──────────┐
                                                 │                     │
                                                 ▼                     ▼
                                        ┌───────────────┐    ┌───────────────┐
                                        │NOTIFY OWNER   │    │ CANT HANDLE   │
                                        │(Booking)      │    │   RESPONSE    │
                                        │+ Confirmation │    │ + NOTIFY      │
                                        └───────────────┘    │   OWNER       │
                                                            └───────────────┘

```

---

## Node Descriptions

### 1. Telegram Trigger
- **Type**: Trigger Node
- **Purpose**: Listens for incoming messages from Telegram
- **Input**: Any message sent to the bot or in the group
- **Output**: Raw message data from Telegram API

---

### 2. Extract Message Data (Set Node)
- **Type**: Processing Node
- **Purpose**: Extracts key fields from the raw message
- **Input**: Raw message from Trigger
- **Output**: Structured data with fields:
  ```
  {
    messageText: "user's message",
    chatType: "private" | "group" | "supergroup",
    chatId: 123456789,
    userId: 123456789,
    userName: "John",
    userUsername: "johndoe"
  }
  ```

---

### 3. Is Private Chat? (Filter)
- **Type**: Logic Node
- **Purpose**: Determines if message is from private chat or group
- **Input**: chatType from Set node
- **Logic**: 
  - IF chatType = "private" → Process as direct message
  - ELSE → Process as group message

---

### 4. Command Filters (Multiple Filter Nodes)
- **Type**: Logic Nodes
- **Purpose**: Checks for specific commands
- **Commands Detected**:
  - `/start` → Send Welcome Message
  - `/help` → Send Help Message
  - `/services` → Send Services List
  - `/pricing` → Send Pricing
  - `/contact` → Send Contact Info
  - `/book` → Send Booking Prompt

---

### 5. Send Messages (Telegram Nodes)
- **Type**: Action Node
- **Purpose**: Sends responses back to user
- **Input**: Message text to send
- **Output**: Sent message to Telegram

---

### 6. Process Message (Code Node)
- **Type**: Processing Node
- **Purpose**: Analyzes non-command messages
- **Input**: messageText from Set node
- **Processing**:
  1. **FAQ Matching**: Checks message against predefined FAQ keywords
  2. **Intent Detection**: Identifies booking intent
  3. **Greeting Detection**: Identifies greetings
  4. **Email Detection**: Checks if message contains email
- **Output**:
  ```
  {
    matchedFaq: "FAQ answer" | null,
    hasBookingIntent: true | false,
    hasEmail: true | false,
    isGreeting: true | false,
    originalMessage: "user message",
    chatId, userId, userName, userUsername
  }
  ```

---

### 7. Filter Nodes (Conditional Logic)
- **Type**: Logic Nodes
- **Purpose**: Routes workflow based on conditions
- **Filters**:
  - Has FAQ Match? → Send FAQ response if matched
  - Is Greeting? → Send greeting if true
  - Has Booking Intent? → Prompt booking if true
  - Has Email? → Notify owner of potential booking

---

### 8. Notify Owner Nodes (Telegram)
- **Type**: Action Node
- **Purpose**: Sends alerts to the owner
- **Types**:
  - **Group Message**: Forwards group messages to owner
  - **Booking**: Notifies when customer provides booking info
  - **Unhandled**: Notifies when bot can't understand message

---

## Data Flow Summary

### Path 1: Direct Commands
```
User sends /services
  → Telegram Trigger
  → Extract Data
  → Is Private Chat? (Yes)
  → Is /services? (Yes)
  → Send Services List (Telegram)
```

### Path 2: FAQ Question
```
User: "How much do you charge?"
  → Telegram Trigger
  → Extract Data
  → Is Private Chat? (Yes)
  → No command matched
  → Process Message
    → Finds "how much" matches FAQ
  → Has FAQ Match? (Yes)
  → Send FAQ Response
```

### Path 3: Booking Request
```
User: "I want to buy a chatbot, my email is john@company.com"
  → Telegram Trigger
  → Extract Data
  → Is Private Chat? (Yes)
  → No command matched
  → Process Message
    → Detects booking intent + email
  → Has Booking Intent? (Yes)
  → Booking Intent Response
  → Has Email? (Yes)
  → Notify Owner (Booking)
  → Booking Confirmation to User
```

### Path 4: Group Message
```
User in group: "Hello everyone"
  → Telegram Trigger
  → Extract Data
  → Is Private Chat? (No - it's a group)
  → Is Group Chat? (Yes)
  → Notify Owner (Group)
  → Process Message (for FAQ/greeting handling)
```

### Path 5: Unhandled Message
```
User: "What's the weather like?"
  → Telegram Trigger
  → Extract Data
  → Is Private Chat? (Yes)
  → No command matched
  → Process Message
    → No FAQ match, no intent detected
  → Has FAQ Match? (No)
  → Is Greeting? (No)
  → Has Booking Intent? (No)
  → Has Email? (No)
  → Can't Handle Response
  → Notify Owner (Unhandled)
```

---

## Key Data Objects

### Input Data (from Telegram)
```json
{
  "message": {
    "message_id": 123,
    "from": {
      "id": 123456789,
      "is_bot": false,
      "first_name": "John",
      "username": "johndoe"
    },
    "chat": {
      "id": 123456789,
      "type": "private",
      "title": null
    },
    "date": 1234567890,
    "text": "Hello, I need help!"
  }
}
```

### Processed Data (after Set node)
```json
{
  "messageText": "Hello, I need help!",
  "chatType": "private",
  "chatId": 123456789,
  "userId": 123456789,
  "userName": "John",
  "userUsername": "johndoe"
}
```

### Analyzed Data (after Code node)
```json
{
  "matchedFaq": null,
  "hasBookingIntent": false,
  "hasEmail": false,
  "isGreeting": true,
  "originalMessage": "Hello, I need help!",
  "chatId": 123456789,
  "userId": 123456789,
  "userName": "John",
  "userUsername": "johndoe"
}
```

---

## FAQ Database (in Code Node)

| Keyword | Response |
|---------|----------|
| what is quantumvector | Company overview |
| what services do you offer | List of 11 services |
| how much / price / pricing | Pricing info |
| how to book | Booking instructions |
| contact / email / phone | Contact details |
| location / office | Office address |
| delivery time / timeline | Service timelines |
| refund / money back | 30-day guarantee |
| support | Support tiers |
| payment | Payment methods |
| vat | 16% VAT info |

---

## Owner Notification Messages

### Group Message Notification
```
🔔 New Group Message

From: John
Group: Quantum AI Clients
Message: Hello everyone

Please review and respond if needed.
```

### Booking Request Notification
```
🔔 New Service Booking Request

From: John
Username: @johndoe
User ID: 123456789
Chat ID: 123456789

Message:
I want to buy a chatbot, my email is john@company.com

Please contact this client ASAP!
```

### Unhandled Message Notification
```
🔔 Unhandled Message Alert

From: John (ID: 123456789)
Chat ID: 123456789

Message:
What's the weather like?

Please assist this customer manually.
```

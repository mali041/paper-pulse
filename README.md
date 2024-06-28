## Getting Started

This `README.md` provides a comprehensive overview of the project, including setup instructions, API endpoint details, sample data, and more.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

````markdown
# Paper-Pulse Backend-Setup-&-endpoints

## Description

This project is a Paper Pulse System that allows you to manage suppliers, waste types, waste receipts, waste received, payments, waste stacks, and waste usage. It uses Next.js for the frontend and backend, Prisma for the ORM, and PostgreSQL as the database. The application is containerized using Docker.

## Features

- **Database Setup:**

  - PostgreSQL database configured with Docker
  - Prisma ORM for database schema management

- **API Endpoints:**
  - CRUD operations for all models (Supplier, WasteType, WasteReceipt, WasteReceived, Payment, WasteStack, WasteUsage)
  - RESTful API structure using Next.js API routes

## Setup Instructions

### Prerequisites

- Docker
- Node.js
- npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/waste-management-system.git
   cd waste-management-system
   ```
````

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following environment variables:

   ```env
   DATABASE_URL=postgresql://postgres:postgres@db:5432/postgres?schema=public
   ```

4. **Run Docker:**

   Ensure Docker is running on your system and then run:

   ```bash
   docker compose up
   ```

5. **Run Prisma migrations:**

   ```bash
   npx prisma migrate dev
   ```

6. **Start the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

### Testing API Endpoints

Use Postman or any other API client to test the endpoints. Here are some example requests:

- **Suppliers:**

  - `GET /api/suppliers`
  - `POST /api/suppliers`
  - `GET /api/suppliers/[id]`
  - `PUT /api/suppliers/[id]`
  - `DELETE /api/suppliers/[id]`

- **Waste Types:**

  - `GET /api/waste-types`
  - `POST /api/waste-types`
  - `GET /api/waste-types/[id]`
  - `PUT /api/waste-types/[id]`
  - `DELETE /api/waste-types/[id]`

- **Waste Receipts:**

  - `GET /api/waste-receipts`
  - `POST /api/waste-receipts`
  - `GET /api/waste-receipts/[id]`
  - `PUT /api/waste-receipts/[id]`
  - `DELETE /api/waste-receipts/[id]`

- **Waste Received:**

  - `GET /api/waste-received`
  - `POST /api/waste-received`
  - `GET /api/waste-received/[id]`
  - `PUT /api/waste-received/[id]`
  - `DELETE /api/waste-received/[id]`

- **Payments:**

  - `GET /api/payments`
  - `POST /api/payments`
  - `GET /api/payments/[id]`
  - `PUT /api/payments/[id]`
  - `DELETE /api/payments/[id]`

- **Waste Stacks:**

  - `GET /api/waste-stacks`
  - `POST /api/waste-stacks`
  - `GET /api/waste-stacks/[id]`
  - `PUT /api/waste-stacks/[id]`
  - `DELETE /api/waste-stacks/[id]`

- **Waste Usage:**
  - `GET /api/waste-usage`
  - `POST /api/waste-usage`
  - `GET /api/waste-usage/[id]`
  - `PUT /api/waste-usage/[id]`
  - `DELETE /api/waste-usage/[id]`

### Sample Data

You can use the following sample data to test the API endpoints:

**Suppliers:**

```json
[
  { "name": "Supplier A", "phoneNo": "1234567890" },
  { "name": "Supplier B", "phoneNo": "0987654321" },
  { "name": "Supplier C", "phoneNo": "1122334455" },
  { "name": "Supplier D", "phoneNo": "5566778899" },
  { "name": "Supplier E", "phoneNo": "6677889900" }
]
```

**Waste Types:**

```json
[
  { "name": "Type A" },
  { "name": "Type B" },
  { "name": "Type C" },
  { "name": "Type D" },
  { "name": "Type E" }
]
```

**Waste Receipts:**

```json
[
  {
    "receiptDate": "2023-01-01",
    "supplierId": 1,
    "vehicleNo": "ABC123",
    "wasteTypeId": 1,
    "stackNo": 1,
    "vehicleWeightWithWaste": 5000,
    "vehicleWeightWithoutWaste": 3000,
    "netWeightOfWaste": 2000,
    "unitPrice": 10
  },
  {
    "receiptDate": "2023-02-01",
    "supplierId": 2,
    "vehicleNo": "DEF456",
    "wasteTypeId": 2,
    "stackNo": 2,
    "vehicleWeightWithWaste": 6000,
    "vehicleWeightWithoutWaste": 3500,
    "netWeightOfWaste": 2500,
    "unitPrice": 12
  }
]
```

**Waste Received:**

```json
[
  {
    "receiptDate": "2023-01-01",
    "supplierId": 1,
    "vehicleNo": "ABC123",
    "receiptId": 1,
    "wasteTypeId": 1,
    "unitPrice": 10,
    "netWeightOfWaste": 2000,
    "totalAmountOfWaste": 20000,
    "paymentReceived": 15000,
    "balance": 5000
  },
  {
    "receiptDate": "2023-02-01",
    "supplierId": 2,
    "vehicleNo": "DEF456",
    "receiptId": 2,
    "wasteTypeId": 2,
    "unitPrice": 12,
    "netWeightOfWaste": 2500,
    "totalAmountOfWaste": 30000,
    "paymentReceived": 20000,
    "balance": 10000
  }
]
```

**Payments:**

```json
[
  {
    "date": "2023-01-01",
    "type": "credit",
    "senderName": "Client A",
    "amount": 5000,
    "receiverName": "Supplier A"
  },
  {
    "date": "2023-02-01",
    "type": "debit",
    "senderName": "Supplier A",
    "amount": 1500,
    "receiverName": "Client A"
  }
]
```

**Waste Stacks:**

```json
[
  {
    "stackNo": 1,
    "wasteTypeId": 1,
    "totalQuantity": 2000
  },
  {
    "stackNo": 2,
    "wasteTypeId": 2,
    "totalQuantity": 2500
  }
]
```

**Waste Usage:**

```json
[
  {
    "stackNo": 1,
    "wasteTypeId": 1,
    "usedQuantity": 500,
    "usageDate": "2023-01-01"
  },
  {
    "stackNo": 2,
    "wasteTypeId": 2,
    "usedQuantity": 700,
    "usageDate": "2023-02-01"
  }
]
```

## License

This project is licensed under the MIT License.

```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
```

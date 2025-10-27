# Step 1: Use official Node.js runtime as a base image
FROM node:20-alpine

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy only package.json (not package-lock.json)
COPY package.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code into the container
COPY . .

# Step 6: Expose the HTTP port (ganti sesuai port app-mu, misalnya 3000)
EXPOSE 3000

# Step 7: Command to run the server
CMD ["node", "server.js"]

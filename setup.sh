#!/bin/bash

# Quick setup script for Bulk SMS System
# Run: bash setup.sh

set -e

echo "🚀 Bulk SMS System - Setup Script"
echo "=================================="

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
echo -e "${BLUE}Checking prerequisites...${NC}"
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+"
    exit 1
fi
echo -e "${GREEN}✓ Node.js $(node -v)${NC}"

# Setup environment files
echo -e "\n${BLUE}Setting up environment variables...${NC}"
if [ ! -f .env ]; then
    cp .env.example .env
    echo -e "${GREEN}✓ Created .env file${NC}"
    echo -e "${YELLOW}⚠️  Please update .env with your credentials${NC}"
else
    echo -e "${GREEN}✓ .env already exists${NC}"
fi

# Setup frontend
echo -e "\n${BLUE}Setting up frontend...${NC}"
cd frontend
if [ ! -d node_modules ]; then
    echo "Installing dependencies..."
    npm install --legacy-peer-deps
    echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
else
    echo -e "${GREEN}✓ Frontend dependencies already installed${NC}"
fi
cd ..

# Setup worker
echo -e "\n${BLUE}Setting up worker...${NC}"
cd worker
if [ ! -d node_modules ]; then
    echo "Installing dependencies..."
    npm install
    echo -e "${GREEN}✓ Worker dependencies installed${NC}"
else
    echo -e "${GREEN}✓ Worker dependencies already installed${NC}"
fi
cd ..

# Setup complete
echo -e "\n${GREEN}✓ Setup complete!${NC}"
echo -e "\nNext steps:"
echo -e "${BLUE}1.${NC} Update environment variables in .env"
echo -e "${BLUE}2.${NC} Set up Supabase database:"
echo "   npm install -g supabase"
echo "   supabase link --project-ref <your-project-ref>"
echo "   supabase db push"
echo -e "${BLUE}3.${NC} Start frontend: cd frontend && npm run dev"
echo -e "${BLUE}4.${NC} Start worker: cd worker && npm run dev"

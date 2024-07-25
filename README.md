# Character designer (CS)
Welcome to the Character Designer project. Character Designer is a fine-tuned generative AI tool designed to assist users in creating detailed and high-quality personalized characters. Through user research, we identified that our primary users are illustrators, developers, and creatives working in the gaming industry. Our survey revealed that 62.5% of participants found conceptualizing traits and backstories to be the most time-consuming aspect of character creation.

Our tool addresses this by streamlining the character creation process, generating both character images with image stabilization and narrative backstories through text generation based on user inputs. By fine-tuning the AI with data from trending games, Character Designer ensures the delivery of high-quality images and narratives, helping users bring their creative visions to life efficiently. 

# Project Purpose

# Features
- **Character Image Generation:** create unique character images using AI, with options to customize various physical traits, image style providing description.
- **Image Stabilization:** ensure high-quality and consistent character images through advanced image stabilization techniques.
- **Backstory Creation:** generate compelling backstories for your characters based on the provided image and traits.
- **Customization Options:** Fine-tune your character’s appearance and backstory with easy-to-use customization features.

# UX Documentation
- [User Survey](https://drive.google.com/file/d/1Zt4NuzuDQVZDZh0VT0ETCalTgYuQxRMs/view?usp=sharing)
- [User Research Analysis](https://drive.google.com/file/d/1Nl65jKSN37Ki7pXZGxMXYxzQ0wK7gc6y/view?usp=sharing)
- [Competitive Analysis]
- [Wireframes]
- [User Flow](https://drive.google.com/file/d/1R72bXj5xS6VrcSysHJTVx0S2YOjReHhZ/view?usp=sharing)
- [Figma prototype](https://www.figma.com/design/gxO6ixJ5dPMKf3LkQXsXYf/Game-Character-Designer?node-id=137-26145&t=eU0Otrbgh3EyDz80-0)
- [Video Demos](https://drive.google.com/file/d/13u5zmK9J2Pljj9AbQ_U4C64rVypfgJbe/view?usp=sharing)

# Usage 

## Welcome Screen
Upon launching the application, you’ll be greeted with a welcome screen. Click the button or press Enter to start creating your character.

## Step 1: Select Image Style
Choose from a variety of image styles such as:

- Claymation: Soft, moldable character appearance.
- Hand-drawn 2D art: Classic, artistic sketch-like look.
- Anthropomorphic animals: Human-like animals with distinctive features.
- Pixel art: Retro, pixelated characters.
- Cel-shaded: Bold, comic-style with sharp outlines.
- Low poly: Simplified geometric shapes.
- Watercolor: Soft, flowing color blends.
- Cartoon: Exaggerated, whimsical features.
- Sci-fi: Futuristic, tech-inspired designs.
- Realistic: Highly detailed, lifelike images.
- Chibi: Featuring exaggerated proportions with large heads and small bodies, cute and playful.
- Anime: Vibrant, stylized with expressive features.

## Step 2: Describe Traits 
Physical Traits
Select various physical traits for your character:
- Hair Color: Blonde, Brunette, Red, Black, etc.
- Hair Style: Long flowing, Short and spiky, Dreadlocks, Gel-combed, etc.
- Height: Tall, Average, Short, etc.
- Build: Muscular, Slender, Stocky, etc.
- Eye Color: Blue, Green, Brown, etc.
- Skin Tone: Fair, Olive, Dark, etc.
- Facial Features: Prominent nose, Sharp jawline, etc.

## Step 3: Add short description 
Write  ~55 characters additionaly to describe your character

## Step 4: Confirmation

## Step 5: Generate Character Image
After confirming the input, CS will generate a character image for you. The image stabilization feature ensures high-quality and consistent results.

## Step 6: Download the image, customize the character traits or move to the backstory generation
Based on the character inputs and description

## Step 7: Select Backstory theme
Based on the character style, traits, and description an epic backstory with 900 characters will be generated for your character.

## Step 8: Write Backstory description up to 500 characters

## Step 9: Customize and Finalize
Fine-tune your character’s backstory with additional customization options. Once satisfied, finalize your character. It only has 8 instances.

# Getting started
## Prerequisites

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Configuration
In order to make the app working you need to define the following environment variables
 - OPENAI_API_KEY
 - OPENAI_ASSISTANT_ID
 - IMAGE_API_KEY
 - IMAGE_API_HOST

## Installation
Install the dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# Contributing
We welcome contributions! Please fork the repository and submit a pull request with your changes. Ensure your code follows the project's coding standards and includes relevant tests.


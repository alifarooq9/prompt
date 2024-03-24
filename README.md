# Prompt - Generate prompt for ChatGpt

Generate prompts for AI chatbots like ChatGPT, GPT-3, and others with a simple and easy-to-use interface. You can generate prompts for various use cases like chatbots, creative writing, and more.

## Creator 🫶

-   Github [@alifarooq9](https://www.github.com/alifarooq9)
-   Twitter [@AliFarooqDev](https://www.twitter.com/AliFarooqDev)

## Built using 🛠️

-   [Create t3 App](https://create.t3.gg)
-   [Next.js](https://nextjs.org)
-   [TailwindCSS](https://tailwindcss.com)
-   [Shadcn/ui](https://ui.shadcn.com)
-   [Emilkowalski/sonner](https://sonner.emilkowal.ski)
-   [Lucia-auth](https://lucia-auth.com)
-   [Drizzle](https://orm.drizzle.team)
-   [HuggingFace](https://huggingface.co)
-   [Turso](https://turso.tech)

## Get Started 🚀

### Requirements

-   [Node.js](https://nodejs.org/en/) >= 20.0.0
-   [pnpm](https://pnpm.io/) >= 8.6.2

### Setup

1. Clone the project

```sh
  git clone https://github.com/alifarooq9/prompt
```

2. Go to the project directory

```sh
  cd prompt
```

3. Install dependencies

```sh
  pnpm install
```

4. Create turso db
   Create your instance of turso db from their website: [turso](https://turso.tech) or using their cli: [turso cli quickstart](https://docs.turso.tech/quickstart).

5. Huggingface Api Key
   Create a huggingface access token by going → Settings → Access Token. [HuggingFace](https://huggingface.co).

6. Set up your .env file
   You will find .env.example. Create your own copy, and rename .env.example to .env, or copy the environment variables from below.

```sh
#Add your turbo url and token
DATABASE_URL="xxxxx"
DATABASE_AUTH_TOKEN="xxxxx"

#Add your huggingface access token
HUGGINGFACE_API_KEY="xxxxx"
```

7. Push schema to turso

```sh
  pnpm db:push
```

8. Run locally

```sh
  pnpm dev
```

or

```sh
  pnpm dev:turbo
```

## Contributing 🤝

Contributions are always welcome!

## Support

For support, email ping@alifarooq.xyz or message me on 𝕏 (formerly twitter) [@AliFarooqDev](https://www.twitter.com/AliFarooqDev).

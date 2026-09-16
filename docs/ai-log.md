# AI Development Log

| Tool | Prompt | Output Used | Output Rejected | Verification | Commit |
|---|---|---|---|---|---|
| ChatGPT | Explain the proposed Next.js, TypeScript, Tailwind CSS, ESLint, and App Router stack in plain language. | Explained that Next.js supplies the application structure, routing, development server, and production build; TypeScript catches type mistakes; Tailwind CSS provides utility classes for styling; ESLint checks code quality; and the App Router maps files under `src/app` to pages and layouts. Used this explanation to review the generated project. | No additional packages or architecture were recommended because the existing stack already met the app-shell requirements. | Confirmed the explanation against `package.json`, `src/app`, and the installed Next.js documentation. | This documentation commit |
| Gemini | Explain the proposed stack in plain language. | The saved Gemini response focused on a minimal project structure, accessible semantic HTML, and keeping the first milestone limited to one page. | Suggestions that could not be confirmed from the saved response were not used. | Confirmed the generated project uses Next.js App Router, TypeScript, Tailwind CSS, ESLint, npm, and a `src` directory. | `8136e89` |
| Google AI Studio (Gemini 3.8 Flash) | Act as an “App Shell Architect.” Provide terminal commands, a minimal file plan, files to modify, accessibility requirements, and a verification checklist. Use Next.js, TypeScript, Tailwind CSS, ESLint, npm, App Router, and a `src` directory. Do not add secrets or unnecessary features, and do not provide a giant code dump. | Used the scaffold command and file plan; semantic `header`, `main`, `section`, heading hierarchy, and feature-list guidance; responsive three-card layout; lint/build checks; and atomic commit suggestions. The generated page shell formed the basis of `src/app/page.tsx`. | Authentication, databases, APIs, maps, property data, environment variables, third-party libraries, and credentials were intentionally excluded. The later metadata recommendation has not yet been applied. | `npm run lint`: passed with 0 errors and 0 warnings. `npm run build`: passed with Next.js 16.3.4; TypeScript completed successfully and `/` was generated as a static route. Local development server returned HTTP 200 and displayed all three feature cards. | `e8d7500` |

## Comparison Notes

1. ChatGPT focused on the purpose of each technology and how the pieces work together. Gemini/AI Studio focused more on concrete commands, files to edit, Git milestones, and a verification checklist.
2. ChatGPT recommended validating the generated project against the installed Next.js version before changing configuration. Gemini/AI Studio was more prescriptive: it proposed a minimal file tree, specific semantic HTML, and later generated the page JSX after reviewing screenshots.

## Outstanding Documentation

- Update `src/app/layout.tsx` metadata before the final merge so the browser title no longer reads “Create Next App.”

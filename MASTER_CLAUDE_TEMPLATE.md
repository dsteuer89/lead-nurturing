# Master Claude Configuration Template

> **Instructions**: Copy this template to create a `claude.md` file in each of your projects.
> Customize the project-specific sections while keeping your personal preferences consistent.

---

## Personal Coding Preferences

### Communication Style
- [ ] Prefer concise explanations / [ ] Prefer detailed explanations
- [ ] Ask before making changes / [ ] Proceed with reasonable assumptions
- [ ] Show all code changes / [ ] Only show significant changes

### Code Style Preferences
```
Language-specific preferences:
- Python: (e.g., PEP 8, type hints, docstring style)
- JavaScript: (e.g., ESLint config, async/await vs promises)
- HTML/CSS: (e.g., naming conventions, preprocessors)
- Other languages you commonly use
```

### Testing Approach
- Preferred testing framework: (e.g., pytest, jest, unittest)
- Test coverage expectations: (e.g., >80%, critical paths only)
- TDD preference: (yes/no/situational)

### Documentation Standards
- Inline comments: (when to use, style)
- README requirements: (sections you always want)
- Docstrings/JSDoc: (style and completeness)

### Git Workflow
- Commit message format: (e.g., conventional commits, custom format)
- Branch naming: (e.g., feature/*, bugfix/*)
- When to create PRs vs direct commits

---

## Technology Stack Preferences

### Frontend
- Preferred frameworks: (e.g., React, Vue, vanilla JS)
- CSS approach: (e.g., utility-first, BEM, CSS modules)
- Build tools: (e.g., Vite, Webpack, none)

### Backend
- Preferred languages: (e.g., Python, Node.js, Go)
- Database preferences: (e.g., PostgreSQL, MySQL, SQLite)
- API style: (e.g., REST, GraphQL)

### DevOps
- Deployment platforms: (e.g., AWS, GCP, Heroku, Netlify)
- CI/CD tools: (e.g., GitHub Actions, CircleCI)
- Containerization: (e.g., Docker, Docker Compose)

---

## Project Organization Patterns

### Directory Structure
```
Your preferred project layout:
/src or /lib
/tests
/docs
/config
(etc.)
```

### File Naming
- Component files: (e.g., PascalCase, kebab-case)
- Utility files: (e.g., snake_case, camelCase)
- Test files: (e.g., *.test.js, test_*.py)

---

## Development Workflow

### Environment Setup
- Virtual environment tool: (e.g., venv, conda, nvm)
- Package manager: (e.g., pip, npm, yarn, pnpm)
- Environment variables: (e.g., .env file handling)

### Common Commands
```bash
# Development server
(e.g., npm run dev, python manage.py runserver)

# Run tests
(e.g., pytest, npm test)

# Build for production
(e.g., npm run build, python setup.py build)

# Deploy
(your deployment command)
```

---

## Special Instructions for Claude

### When to Ask vs Proceed
- Always ask about: (e.g., database migrations, API changes, dependency updates)
- OK to proceed with: (e.g., fixing typos, adding comments, refactoring within a file)

### Context to Always Consider
- (e.g., "This is for a startup/enterprise environment")
- (e.g., "Performance is critical / development speed is critical")
- (e.g., "Must support IE11 / Modern browsers only")

### Common Patterns in Your Code
- (e.g., "I use a service layer pattern")
- (e.g., "I prefer functional components with hooks")
- (e.g., "I use dependency injection")

---

## Notes
Add any other preferences, quirks, or important context that Claude should know when working across all your projects.

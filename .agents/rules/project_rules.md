# Project Guidelines & Rules

All development within this repository must strictly adhere to the following 15 rules:

1. **CSS Files**: Must be created separately (no inline styles or tightly coupled single-file styling where separate CSS files are expected).
2. **Naming Conventions**: File/component names must NOT contain spaces. Always use clean naming conventions (PascalCase for components, camelCase or kebab-case for utilities/styles).
3. **SDK Versions**: Use the project's required SDK version. Do NOT upgrade or downgrade SDK versions unless explicitly directed.
4. **Java Version**: Strict Java 17 requirement.
5. **Architecture**: Use Advanced Modular Monolithic architecture. Maintain domain boundaries and high cohesion.
6. **Functional Style**: Prefer functional components and functions. Avoid unnecessary class-based architecture.
7. **Clean Rendering**: NO unnecessary loops. Use clean functional rendering/mapping only where appropriate. Do not write complicated loop logic.
8. **File Size Limit**: Keep each file preferably UNDER 300 lines. If a file grows large, decompose it into logical subcomponents.
9. **No Duplicate Files**: Prevent redundant or duplicate files across directories.
10. **No Unwanted Files**: Keep the repository clean; do not create temporary, unused, or obsolete files.
11. **Production-Ready**: Code must be reliable, resilient, and production-ready.
12. **Dynamic UI**: UI must be dynamic. Do NOT hardcode the selected state or active options in the UI.
13. **Data Separation**: Avoid unnecessary hardcoded values where configuration, constants, or mock/API data can be separated.
14. **Reuse**: Reuse existing project utilities, hooks, design tokens, and components instead of recreating them.
15. **Code Quality**: Keep the implementation clean, maintainable, and scalable.

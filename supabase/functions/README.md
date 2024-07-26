## Supabase Edge functions

[View Guide](https://supabase.com/docs/guides/functions)

- Create a new function, and then find it inside `supabase/functions` folder.

```tsx
npx supabase functions new payment-sheet
```

Run the function locally:

```tsx
npx supabase functions serve --env-file .env payment-sheet
```

Send a test request.

Note: the Edge functions are executed with Deno runtime, not NodeJS. In the next step, you will see that Deno can import packages through a url.

### Use Case

This directory defines the functions that will be used in the food ordering application.
# Life Portal

Small local-first personal dashboard built with Node, static HTML/CSS/JS, and SQLite.

## Pages

- Finance: spending, income, category totals, and Plaid transaction review.
- Budget: date ranges, required income, and category budgets.
- Debt: loan tracking and graduation date planning.
- Work: placeholder tab.

## Run

```sh
cp .env.example .env
npm run dev
```

Open `http://127.0.0.1:3000`.

On first run, the app creates `data/life-portal.sqlite` automatically. Keep `.env` and `data/` private.

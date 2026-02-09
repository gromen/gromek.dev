# Formspree Setup Instructions

The contact form on both `/pl/kontakt` and `/en/contact` pages is configured to use Formspree for zero-backend form submissions.

## Setup Steps

1. **Create a Formspree Account**
   - Go to [https://formspree.io/](https://formspree.io/)
   - Sign up for a free account (up to 50 submissions/month)

2. **Create a New Form**
   - After logging in, click "New Form"
   - Give it a name (e.g., "gromek.dev Contact Form")
   - You'll receive a unique form ID

3. **Update Form Action URLs**
   Replace `YOUR_FORM_ID` in both contact pages with your actual Formspree form ID:

   - **File:** `/src/pages/pl/kontakt.astro`
   - **File:** `/src/pages/en/contact.astro`

   Change:
   ```html
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```

   To:
   ```html
   action="https://formspree.io/f/xyzabc123"
   ```
   (Replace `xyzabc123` with your actual form ID)

4. **Configure Formspree Settings (Optional)**
   In your Formspree dashboard, you can configure:
   - Email notifications
   - Redirect URL after submission
   - Spam filtering settings
   - Custom response messages
   - File upload limits

## Security Features Implemented

The contact form includes multiple security measures:

- **Honeypot Field**: Hidden `_gotcha` field to catch spam bots
- **CSRF Protection**: Formspree handles CSRF validation automatically
- **Rate Limiting**: Formspree includes built-in rate limiting
- **Email Validation**: Client-side regex validation + HTML5 email type
- **No XSS Risk**: No user input is rendered directly in the DOM
- **HTTPS Only**: Form submissions are sent over secure HTTPS

## Form Fields

The form collects:
- **name**: Full name (text input, required)
- **email**: Email address (email input, required)
- **message**: Message content (textarea, required)

## Validation

Client-side validation includes:
- Required field checks
- Email format validation using regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Real-time error messages
- Accessibility support with ARIA attributes

## Accessibility Features

- Proper semantic HTML structure
- ARIA labels and descriptions
- Focus management with visible focus rings
- Screen reader announcements for form status
- Keyboard navigation support
- High contrast error states

## Testing

To test the form:
1. Fill out all required fields
2. Submit the form
3. Check the email associated with your Formspree account
4. Verify the submission appears in your Formspree dashboard

## Alternative: Use Environment Variable

For better security, you can store the Formspree ID in an environment variable:

1. Create `.env` file:
   ```
   PUBLIC_FORMSPREE_FORM_ID=xyzabc123
   ```

2. Update the form action in both pages:
   ```astro
   ---
   const formspreeId = import.meta.env.PUBLIC_FORMSPREE_FORM_ID || 'YOUR_FORM_ID';
   ---

   <form action={`https://formspree.io/f/${formspreeId}`}>
   ```

3. Add `.env` to `.gitignore` to prevent committing the form ID

## Troubleshooting

- **Form not submitting**: Check browser console for errors
- **Emails not received**: Verify email in Formspree dashboard settings
- **Spam issues**: Enable Formspree's reCAPTCHA integration
- **429 Rate Limit Error**: You've exceeded Formspree's submission limit for your plan

## Free Plan Limits

Formspree free plan includes:
- 50 submissions per month
- Email notifications
- Basic spam filtering
- No custom redirect

Upgrade to a paid plan for:
- Higher submission limits
- Custom branding removal
- Advanced integrations
- Priority support

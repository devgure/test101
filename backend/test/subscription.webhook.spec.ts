// backend/test/subscription.webhook.spec.ts
describe('Stripe Webhook', () => {
  it('should create subscription on checkout.session.completed', async () => {
    const payload = { /* mock Stripe event */ };
    const sig = 'valid-signature';

    const response = await request(app)
      .post('/webhook/stripe')
      .set('Stripe-Signature', sig)
      .send(payload);

    expect(response.status).toBe(201);
    expect(await prisma.subscription.count()).toBe(1);
  });
});
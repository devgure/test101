// src/subscription/subscription.controller.ts
@Post('webhook')
async handleWebhook(@Req() req, @Res() res) {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.client_reference_id;
    await this.prisma.subscription.create({
      data: {
        userId,
        stripeId: session.subscription,
        status: 'active',
        plan: 'sparkr_plus',
        currentPeriodEnd: new Date(session.expires_at * 1000),
      },
    });
  }

  res.json({ received: true });
}
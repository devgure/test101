// backend/src/subscription/stripe.webhook.ts
import { Body, Controller, Post, RawBodyRequest } from '@nestjs/common';
import { Request } from 'express';
import { Stripe } from 'stripe';
import { PrismaService } from '../../prisma/prisma.service';

@Controller('webhook')
export class StripeWebhookController {
  private stripe: Stripe;

  constructor(private prisma: PrismaService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    });
  }

  @Post('stripe')
  async handleWebhook(
    @Body() payload: any,
    @Req() req: RawBodyRequest<Request>,
  ) {
    const sig = req.headers['stripe-signature'];
    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        req.rawBody,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err) {
      return { error: `Webhook Error: ${err.message}` };
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.client_reference_id;

      await this.prisma.subscription.create({
        data: {
          userId,
          stripeId: session.subscription as string,
          status: 'active',
          plan: 'sparkr_plus',
          currentPeriodEnd: new Date((session.expires_at || 0) * 1000),
        },
      });
    }

    return { received: true };
  }
}
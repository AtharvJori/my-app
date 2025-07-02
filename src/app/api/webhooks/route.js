import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextResponse } from 'next/server'
import { createOrUpdateUser, deleteUser } from '@/utils/user.actions'

export async function POST(req) {
  try {
    const evt = await verifyWebhook(req)
    const { id, first_name, last_name, image_url, email_addresses } = evt.data
    const eventType = evt.type

    console.log(`Processing webhook: ${eventType} for user ${id}`)

    switch (eventType) {
      case 'user.created':
      case 'user.updated':
        // Create or update user in MongoDB
        const user = await createOrUpdateUser({
          id,
          first_name,
          last_name,
          image_url,
          email_addresses
        })
        console.log(`User ${user.clerkId} ${eventType} successfully`)
        break

      case 'user.deleted':
        // Soft delete user in MongoDB
        const deletedUser = await deleteUser(id)
        console.log(`User ${deletedUser.clerkId} marked as inactive`)
        break

      default:
        console.warn(`Unhandled event type: ${eventType}`)
        return NextResponse.json(
          { message: 'Unhandled event type' },
          { status: 200 }
        )
    }

    return NextResponse.json(
      { message: 'Webhook processed successfully' },
      { status: 200 }
    )
  } catch (err) {
    console.error('Error processing webhook:', err)
    return NextResponse.json(
      { error: 'Error processing webhook' },
      { status: 400 }
    )
  }
}
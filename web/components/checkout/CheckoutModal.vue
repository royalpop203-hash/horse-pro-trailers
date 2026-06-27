<template>
  <div
    class="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4"
    @click.self="$emit('close')"
  >
    <div class="bg-white rounded-md shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh] overflow-hidden">

      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0">
        <h3 class="text-[18px] font-serif font-bold text-brand-darkblue uppercase tracking-wider">
          Purchase / Reserve
        </h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-700 text-3xl font-light leading-none">&times;</button>
      </div>

      <!-- Step indicator -->
      <div class="flex items-center gap-1 px-6 py-3 border-b border-gray-100 text-[11px] uppercase tracking-wide overflow-x-auto shrink-0">
        <template v-for="(label, i) in STEPS" :key="label">
          <div class="flex items-center gap-1.5 shrink-0">
            <span
              class="flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-bold transition-colors"
              :class="step >= i + 1
                ? 'bg-brand-darkblue border-brand-darkblue text-white'
                : 'border-gray-300 text-gray-400'"
            >{{ i + 1 }}</span>
            <span
              class="transition-colors"
              :class="step === i + 1 ? 'text-brand-darkblue font-semibold' : 'text-gray-400'"
            >{{ label }}</span>
          </div>
          <span v-if="i < STEPS.length - 1" class="text-gray-300 shrink-0 px-0.5">›</span>
        </template>
      </div>

      <!-- Body -->
      <div class="flex-1 overflow-y-auto px-6 py-6">

        <!-- Step 1: Contact & Address -->
        <section v-if="step === 1" class="space-y-3">
          <h4 class="font-semibold text-gray-900 mb-4">Contact &amp; address</h4>
          <input
            v-model="form.email"
            type="email"
            placeholder="Email *"
            class="h-11 w-full border border-gray-300 px-3 text-sm rounded-sm focus:border-brand-darkblue focus:outline-none"
          />
          <input
            v-model="form.fullName"
            type="text"
            placeholder="Full name *"
            class="h-11 w-full border border-gray-300 px-3 text-sm rounded-sm focus:border-brand-darkblue focus:outline-none"
          />
          <input
            v-model="form.phone"
            type="tel"
            placeholder="Phone *"
            class="h-11 w-full border border-gray-300 px-3 text-sm rounded-sm focus:border-brand-darkblue focus:outline-none"
          />
          <input
            v-model="form.line1"
            type="text"
            placeholder="Address line 1 *"
            class="h-11 w-full border border-gray-300 px-3 text-sm rounded-sm focus:border-brand-darkblue focus:outline-none"
          />
          <input
            v-model="form.line2"
            type="text"
            placeholder="Address line 2 (optional)"
            class="h-11 w-full border border-gray-300 px-3 text-sm rounded-sm focus:border-brand-darkblue focus:outline-none"
          />
          <div class="grid grid-cols-2 gap-3">
            <input
              v-model="form.city"
              type="text"
              placeholder="City *"
              class="h-11 border border-gray-300 px-3 text-sm rounded-sm focus:border-brand-darkblue focus:outline-none"
            />
            <input
              v-model="form.state"
              type="text"
              placeholder="State *"
              class="h-11 border border-gray-300 px-3 text-sm rounded-sm focus:border-brand-darkblue focus:outline-none"
            />
            <input
              v-model="form.postalCode"
              type="text"
              placeholder="Postal code *"
              class="h-11 border border-gray-300 px-3 text-sm rounded-sm focus:border-brand-darkblue focus:outline-none"
            />
            <input
              v-model="form.country"
              type="text"
              placeholder="Country"
              class="h-11 border border-gray-300 px-3 text-sm rounded-sm focus:border-brand-darkblue focus:outline-none"
            />
          </div>
        </section>

        <!-- Step 2: Delivery Preference -->
        <section v-else-if="step === 2" class="space-y-4">
          <h4 class="font-semibold text-gray-900 mb-4">Delivery preference</h4>
          <label
            class="flex cursor-pointer items-start gap-3 border p-4 rounded-sm transition-colors"
            :class="deliveryMethod === 'pickup'
              ? 'border-brand-darkblue ring-1 ring-brand-darkblue'
              : 'border-gray-300 hover:border-gray-400'"
          >
            <input v-model="deliveryMethod" type="radio" value="pickup" class="mt-1 accent-brand-darkblue" />
            <span class="flex-1">
              <span class="block text-sm font-semibold text-gray-900">Pickup</span>
              <span class="block text-xs text-gray-500 mt-0.5">Collect from our dealership at no extra charge</span>
            </span>
            <span class="text-sm font-semibold text-green-600 shrink-0">Free</span>
          </label>
          <label
            class="flex cursor-pointer items-start gap-3 border p-4 rounded-sm transition-colors"
            :class="deliveryMethod === 'delivery'
              ? 'border-brand-darkblue ring-1 ring-brand-darkblue'
              : 'border-gray-300 hover:border-gray-400'"
          >
            <input v-model="deliveryMethod" type="radio" value="delivery" class="mt-1 accent-brand-darkblue" />
            <span class="flex-1">
              <span class="block text-sm font-semibold text-gray-900">Delivery</span>
              <span class="block text-xs text-gray-500 mt-0.5">We'll reach out with a delivery quote after your order is placed</span>
            </span>
            <span class="text-sm font-semibold text-gray-400 shrink-0">Quote TBD</span>
          </label>
        </section>

        <!-- Step 3: Payment Method -->
        <section v-else-if="step === 3" class="space-y-4">
          <h4 class="font-semibold text-gray-900 mb-1">Payment method</h4>
          <p class="text-xs text-gray-500 mb-4">Select how you'll send payment after placing your order.</p>
          <div v-if="paymentLoading" class="py-10 text-center text-sm text-gray-400">
            Loading payment options…
          </div>
          <template v-else>
            <label
              v-for="m in ALL_METHODS.filter(m => isAvailable(m.key))"
              :key="m.key"
              class="flex items-center gap-3 border p-4 rounded-sm transition-colors cursor-pointer"
              :class="paymentMethod === m.key
                ? 'border-brand-darkblue ring-1 ring-brand-darkblue'
                : 'border-gray-300 hover:border-gray-400'"
            >
              <input
                v-model="paymentMethod"
                type="radio"
                :value="m.key"
                class="accent-brand-darkblue"
              />
              <span class="text-sm font-semibold text-gray-900">{{ m.label }}</span>
            </label>
            <p v-if="ALL_METHODS.filter(m => isAvailable(m.key)).length === 0" class="text-sm text-gray-500 py-4">
              No payment methods are currently available. Please contact us directly.
            </p>
          </template>
        </section>

        <!-- Step 4: Review -->
        <section v-else-if="step === 4" class="space-y-4 text-sm">
          <h4 class="font-semibold text-gray-900 mb-4">Review your order</h4>

          <!-- Product summary -->
          <div class="flex gap-4 border border-gray-200 p-4 rounded-sm">
            <img
              v-if="product.image"
              :src="product.image"
              :alt="product.title"
              class="h-20 w-28 object-cover rounded-sm shrink-0"
            />
            <div class="flex flex-col justify-center">
              <p class="font-semibold text-gray-900 leading-snug">{{ product.title }}</p>
              <p class="text-brand-darkblue font-bold text-lg mt-1">{{ formattedPrice }}</p>
            </div>
          </div>

          <!-- Contact / address -->
          <div class="border border-gray-200 p-4 rounded-sm">
            <p class="mb-2 text-[11px] font-semibold uppercase tracking-wide text-gray-400">Contact</p>
            <p class="font-medium text-gray-900">{{ form.fullName }}</p>
            <p class="text-gray-500">{{ form.email }} · {{ form.phone }}</p>
            <p class="text-gray-500 mt-1">
              {{ form.line1 }}<span v-if="form.line2">, {{ form.line2 }}</span>
            </p>
            <p class="text-gray-500">{{ form.city }}, {{ form.state }} {{ form.postalCode }}</p>
            <p class="text-gray-500">{{ form.country }}</p>
          </div>

          <!-- Delivery & payment -->
          <div class="grid grid-cols-2 gap-3">
            <div class="border border-gray-200 p-4 rounded-sm">
              <p class="mb-1 text-[11px] font-semibold uppercase tracking-wide text-gray-400">Delivery</p>
              <p class="font-medium text-gray-900 capitalize">
                {{ deliveryMethod === 'pickup' ? 'Pickup' : 'Delivery (quote TBD)' }}
              </p>
            </div>
            <div class="border border-gray-200 p-4 rounded-sm">
              <p class="mb-1 text-[11px] font-semibold uppercase tracking-wide text-gray-400">Payment</p>
              <p class="font-medium text-gray-900">{{ currentMethodLabel }}</p>
            </div>
          </div>

          <p v-if="errorMessage" class="text-red-600 font-medium">{{ errorMessage }}</p>
        </section>

        <!-- Step 5: Confirmation -->
        <section v-else class="space-y-5 py-2">
          <div class="text-center space-y-3">
            <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-darkblue text-3xl text-white">
              ✓
            </div>
            <h4 class="text-xl font-bold text-gray-900">Order Reserved!</h4>
            <p class="text-sm text-gray-500">
              Thanks, {{ form.fullName.split(' ')[0] || 'friend' }}. A confirmation has been sent to {{ form.email }}.
            </p>
            <div
              v-if="placedOrderId"
              class="inline-flex items-center gap-2 border border-gray-200 px-3 py-1.5 rounded-sm"
            >
              <span class="text-xs text-gray-400">Order #</span>
              <span class="font-mono text-sm font-bold tracking-wider">{{ placedOrderId }}</span>
              <button
                type="button"
                class="text-xs text-gray-400 hover:text-brand-darkblue underline"
                @click="copyOrderId"
              >{{ orderIdCopied ? 'Copied!' : 'Copy' }}</button>
            </div>
          </div>

          <div class="border-t border-gray-200 pt-5 space-y-4">
            <div>
              <h5 class="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Payment required</h5>
              <p class="text-sm text-gray-600">
                Your trailer is reserved. To confirm, send full payment via
                <span class="font-semibold text-gray-900">{{ currentMethodLabel }}</span>
                and include your order number in the memo.
              </p>
            </div>

            <div v-if="confirmPaymentLoading" class="h-16 flex items-center justify-center border border-gray-200 rounded-sm">
              <p class="text-xs text-gray-400">Loading payment details…</p>
            </div>

            <template v-else-if="paymentInfo?.available">
              <div class="border border-gray-200 p-4 rounded-sm space-y-3 bg-gray-50">
                <div v-if="paymentInfo.recipient_name" class="flex items-center justify-between text-sm">
                  <span class="text-gray-400">Recipient</span>
                  <span class="font-medium text-gray-900">{{ paymentInfo.recipient_name }}</span>
                </div>
                <div v-if="paymentInfo.identifier" class="flex items-center justify-between text-sm">
                  <span class="text-gray-400">{{ identifierLabel }}</span>
                  <div class="flex items-center gap-2">
                    <span class="font-mono font-semibold text-gray-900">{{ paymentInfo.identifier }}</span>
                    <button
                      type="button"
                      class="border border-gray-300 px-2 py-0.5 text-[11px] hover:bg-brand-darkblue hover:text-white hover:border-brand-darkblue transition-colors rounded-sm"
                      @click="copyIdentifier"
                    >{{ identifierCopied ? 'Copied!' : 'Copy' }}</button>
                  </div>
                </div>
              </div>
            </template>

            <div
              v-if="confirmContact.email || confirmContact.phone"
              class="border border-gray-200 p-4 rounded-sm space-y-2"
            >
              <p class="text-xs font-semibold uppercase tracking-widest text-gray-400">After paying, contact us:</p>
              <p v-if="confirmContact.email" class="text-sm text-gray-700">✉ {{ confirmContact.email }}</p>
              <p v-if="confirmContact.phone" class="text-sm text-gray-700">📱 {{ confirmContact.phone }}</p>
            </div>
          </div>

          <div class="text-center pt-2">
            <button
              type="button"
              class="h-11 border-2 border-brand-darkblue text-brand-darkblue px-6 text-xs font-bold uppercase tracking-wide hover:bg-brand-darkblue hover:text-white transition-colors rounded-sm"
              @click="$emit('close')"
            >Back to listing</button>
          </div>
        </section>
      </div>

      <!-- Footer nav -->
      <div v-if="step < 5" class="flex items-center justify-between gap-3 border-t border-gray-200 px-6 py-4 shrink-0">
        <button
          v-if="step > 1"
          type="button"
          class="h-10 px-4 text-xs font-semibold uppercase tracking-wide text-gray-500 hover:text-gray-800"
          @click="back"
        >← Back</button>
        <span v-else />

        <button
          v-if="step < 4"
          type="button"
          class="h-10 bg-brand-darkblue text-white px-6 text-xs font-bold uppercase tracking-wide disabled:opacity-50 rounded-sm hover:bg-opacity-90 transition-opacity"
          :disabled="step === 1 && !canContinueContact"
          @click="next"
        >Continue</button>

        <button
          v-else
          type="button"
          class="h-10 bg-brand-yellow text-white px-6 text-xs font-bold uppercase tracking-wide disabled:opacity-50 rounded-sm hover:bg-opacity-90 transition-opacity"
          :disabled="isSubmitting"
          @click="placeOrder"
        >{{ isSubmitting ? 'Processing…' : 'Place Order' }}</button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useSupabaseClient } from '#imports'

interface Product {
  id: string
  title: string
  price: number | null
  slug: string
  image: string
}

interface PaymentInfo {
  method: string
  available: boolean
  recipient_name: string | null
  identifier: string | null
}

const props = defineProps<{ product: Product }>()
defineEmits<{ close: [] }>()

const STEPS = ['Contact', 'Delivery', 'Payment', 'Review', 'Confirmation'] as const

const ALL_METHODS = [
  { key: 'bank_transfer', label: 'Bank Transfer' },
] as const

const IDENTIFIER_LABELS: Record<string, string> = {
  bank_transfer: 'Account',
}

const supabase = useSupabaseClient()

const step = ref<1 | 2 | 3 | 4 | 5>(1)
const isSubmitting = ref(false)
const errorMessage = ref('')
const placedOrderId = ref<string | null>(null)
const orderIdCopied = ref(false)
const identifierCopied = ref(false)

const form = reactive({
  email: '',
  fullName: '',
  phone: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  postalCode: '',
  country: 'United States',
})

const deliveryMethod = ref<'pickup' | 'delivery'>('pickup')
const paymentMethod = ref<string>('bank_transfer')

const paymentLoading = ref(false)
const methodAvailability = ref<Record<string, boolean>>({})

const confirmPaymentLoading = ref(false)
const paymentInfo = ref<PaymentInfo | null>(null)
const confirmContact = ref({ email: '', phone: '' })

const canContinueContact = computed(() =>
  form.email.includes('@') &&
  form.fullName.length > 1 &&
  form.phone.length > 1 &&
  form.line1.length > 1 &&
  form.city.length > 0 &&
  form.state.length > 0 &&
  form.postalCode.length > 0
)

function isAvailable(method: string): boolean {
  if (Object.keys(methodAvailability.value).length === 0) return true
  return methodAvailability.value[method] !== false
}

const currentMethodLabel = computed(
  () => ALL_METHODS.find(m => m.key === paymentMethod.value)?.label ?? paymentMethod.value
)

const identifierLabel = computed(() => IDENTIFIER_LABELS[paymentMethod.value] ?? 'Send to')

const formattedPrice = computed(() => {
  if (!props.product.price) return 'Call for Price'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(props.product.price)
})

function next() {
  if (step.value < 5) step.value = (step.value + 1) as typeof step.value
}

function back() {
  if (step.value > 1) step.value = (step.value - 1) as typeof step.value
}

async function placeOrder() {
  isSubmitting.value = true
  errorMessage.value = ''
  try {
    const result = await $fetch<{ success: boolean; orderId: string }>('/api/orders', {
      method: 'POST',
      body: {
        product_id: props.product.id,
        product_title: props.product.title,
        product_price: props.product.price,
        customer_name: form.fullName,
        customer_email: form.email,
        customer_phone: form.phone,
        address: {
          line1: form.line1,
          line2: form.line2,
          city: form.city,
          state: form.state,
          postalCode: form.postalCode,
          country: form.country,
        },
        delivery_method: deliveryMethod.value,
        payment_method: paymentMethod.value,
      },
    })
    placedOrderId.value = result.orderId
    step.value = 5
    loadConfirmationData()
  } catch (err: any) {
    errorMessage.value = err?.data?.statusMessage || 'Something went wrong. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

async function loadConfirmationData() {
  confirmPaymentLoading.value = true
  try {
    const [{ data: pd }, { data: sc }] = await Promise.all([
      supabase.from('payment_details').select('*').eq('method', paymentMethod.value).maybeSingle(),
      supabase.from('store_config').select('*'),
    ])
    paymentInfo.value = pd as PaymentInfo | null
    if (sc) {
      const cfg = sc as { key: string; value: string }[]
      confirmContact.value = {
        email: cfg.find(r => r.key === 'confirmation_email')?.value ?? '',
        phone: cfg.find(r => r.key === 'confirmation_phone')?.value ?? '',
      }
    }
  } finally {
    confirmPaymentLoading.value = false
  }
}

async function copyOrderId() {
  if (!placedOrderId.value) return
  await navigator.clipboard.writeText(placedOrderId.value)
  orderIdCopied.value = true
  setTimeout(() => { orderIdCopied.value = false }, 2000)
}

async function copyIdentifier() {
  if (!paymentInfo.value?.identifier) return
  await navigator.clipboard.writeText(paymentInfo.value.identifier)
  identifierCopied.value = true
  setTimeout(() => { identifierCopied.value = false }, 2000)
}

onMounted(async () => {
  paymentLoading.value = true
  try {
    const { data } = await supabase.from('payment_details').select('method, available')
    if (data) {
      for (const row of data as { method: string; available: boolean }[]) {
        methodAvailability.value[row.method] = row.available
      }
      if (!isAvailable(paymentMethod.value)) {
        const first = ALL_METHODS.find(m => isAvailable(m.key))
        if (first) paymentMethod.value = first.key
      }
    }
  } finally {
    paymentLoading.value = false
  }
})
</script>

<script setup>
    import { ref, onMounted } from 'vue'
    import { useToast } from 'vue-toastification'

    import axios from 'axios'

    const allTransactions = ref([])
    const refId = ref([])
    const accounts = ref([])

    const transactionDetail = ref(null)
    const showDetails = ref(true)

    const toast = useToast()

    onMounted(() => {fetchTransactions(), fetchBalance()})

    async function handleFilter(){
      try {
        if(!refId.value){
            throw new Error('Reference Id is required...') 
        }

        const res = await axios.get(`/api/admin/transaction/${refId.value}`)

        if (res.status == 200) {
            const data = res.data
            transactionDetail.value = data
            showDetails.value = !false
        }
      } catch (e) {
        toast.error(e.message)
        console.error('Caught error:', e);
      }
    }

async function fetchBalance() {
  try {
    const res = await axios.get('/api/admin/transactions/balance')

    if (res.status == 200) {
        const data = res.data
        accounts.value = res.data
    }
  } catch (e) {
    toast.error(e.message)
    console.error('Caught error:', e);
  }
}

function groupByCategory(data) {
  const grouped = {}

  data.forEach(item => {
    if (!grouped[item.status]) {
      grouped[item.status] = []
    }
    grouped[item.status].push({
      id: item.id,
      amount: item.amount,
      reference: item.reference,
      email: item.customer.email,
      status: item.status,
    })
  })

  // Convert to desired structure
  return Object.entries(grouped).map(([category, transactions]) => ({
    category,
    transactions
  }))
}

async function fetchTransactions() {
  try {
    const res = await axios.get('/api/admin/transactions')

    if (res.status == 200) {
        const data = res.data
        const groupedData = groupByCategory(data)
        allTransactions.value = groupedData
    }
  } catch (e) {
    console.error('Caught error:', e);
  }
}

</script>

<template>
    <div>
        <div v-if="showDetails">
            <div class="text-indigo-500 text-xl">
                Transaction Details
            </div>
            <div v-if="transactionDetail" class="w-full overflow-x-auto mt-10">
                <table class="w-full text-left border-collapse">
                    <tbody>
                        <tr class="border-t">
                            <td class="px-4 py-2">Customer Id</td>
                            <td class="px-4 py-2">{{ transactionDetail.customer.id }}</td>
                        </tr>
                        <tr class="border-t">
                            <td class="px-4 py-2">Reference Number</td>
                            <td class="px-4 py-2">{{ transactionDetail.reference }}</td>
                        </tr>
                        <tr class="border-t">
                            <td class="px-4 py-2">Email</td>
                            <td class="px-4 py-2">{{ transactionDetail.customer.email }}</td>
                        </tr>
                        <tr class="border-t">
                            <td class="px-4 py-2">Requested Amount</td>
                            <td class="px-4 py-2">{{ transactionDetail.requested_amount }}</td>
                        </tr>
                        <tr class="border-t">
                            <td class="px-4 py-2">Payment Method</td>
                            <td class="px-4 py-2">{{ transactionDetail.channel }} ({{ transactionDetail.authorization.brand}})</td>
                        </tr>
                        <tr class="border-t">
                            <td class="px-4 py-2">Sender Bank</td>
                            <td class="px-4 py-2">{{ transactionDetail.authorization.bank }}</td>
                        </tr>
                        <tr class="border-t">
                            <td class="px-4 py-2">Transaction Date</td>
                            <td class="px-4 py-2">{{ transactionDetail.createdAt }}</td>
                        </tr>
                        <tr class="border-t">
                            <td class="px-4 py-2">Status</td>
                            <td class="px-4 py-2">{{ transactionDetail.status}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div>
            <div class="grid gap-3 md:grid-cols-3">
                <div v-for="account in accounts" class="shadow mt-3 bg-red-50 rounded p-3">
                    <span class="text-indigo-500">Account Balance</span>
                    <div class="text-xl"><span class="text-sm classtext-sm font-bold">{{ account.currency}}:</span> {{ account.balance }}</div>
                </div>
                <div class="shadow mt-3 flex flex-col bg-red-50 col-span-2 rounded p-3">
                    <span class="text-indigo-500">Login to Paystack</span>
                    <a class="bg-indigo-500 mt-3 p-2 text-white rounded" href="http://www.paystack.com" target="_blank">
                        <i class="ri-external-link-line ms-4"></i>
                        Login Paystack
                    </a>
                </div>
            </div>
            <div class="mt-4">
                <span class="text-indigo-500">Search Reference Number</span>
                <div class="flex gap-2">
                    <input v-model="refId" placeholder="Enter Reference Id" class="rounded bg-blue-100 border border-gray-300 shadow p-2 flex-1" type="text"/>
                    <button @click="handleFilter" class="p-2 md:w-30 rounded shadow-lg bg-indigo-500 text-white">Search</button>
                </div>
            </div>
            <div v-for="(category, index) in allTransactions" class="w-full overflow-x-auto mt-10">
                <div class="font-bold text-xl text-indigo-500 uppercase mb-3">{{ category.category }}</div>
                <table class="w-full text-left border-collapse">
                    <thead class="bg-gray-100 font-semibold text-gray-700">
                        <tr>
                            <th class="px-4 py-2">S/N</th>
                            <th class="px-4 py-2">Id</th>
                            <th class="px-4 py-2">Ref</th>
                            <th class="px-4 py-2">Customer</th>
                            <th class="px-4 py-2">Amount</th>
                            <th class="px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(transaction, index) in category.transactions" :key="transaction" class="border-t">
                            <td class="px-4 py-2">{{ index + 1 }}</td>
                            <td class="px-4 py-2">{{ transaction.id }}</td>
                            <td class="px-4 py-2">{{ transaction.reference }}</td>
                            <td class="px-4 py-2">{{ transaction.email }}</td>
                            <td class="px-4 py-2">{{ transaction.amount }}</td>
                            <td class="px-4 py-2"><i :class="[transaction.status === 'success' ? 'ri-checkbox-circle-fill text-green-500' : 'ri-checkbox-blank-circle-fill text-red-500']"></i></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>





<script setup>
import axios from 'axios'
import { defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import PaystackPop from '@paystack/inline-js'

const props = defineProps(['email', 'metadata','amount', 'course'])

const router = useRouter()

function verifyPayment(reference){
  axios.get(`/api/verify/${reference}`)
    .then(data => {
      if (data.data.status == 'success') {

        //enroll user on payment verification
        const res = axios.post('/api/student/enrollment', { courseId: props.course, paid: 1 })
        //reload page on successful enrollment
        router.go(0)
      } else {
        throw new Error('Payment was not successfull')
      }
    })
    .catch((e) => console.log('Error verifying transaction', e))
}

const handleClick = async (email, amount) => {
  if (!email) {
    alert('Please enter valid email')
    return
  }

  console.log(amount)

  // If course is free, then enroll user without payment
  if( amount !== 0 ){
      const handler = new PaystackPop()

      handler.newTransaction({
        key: 'pk_test_71133a49d4fa2f3e24d489e6ac3d4d8b8ec46951',
        email: email,
        metadate: props.metadata,
        amount: amount * 100,  // Convert NGN to kobo
        currency: 'NGN',
        ref: '' + Math.floor(Math.random() * 1000000000),
        onSuccess: function(response) {
          verifyPayment(response.reference)
        },
        onCancel: function() {
            console.log('Transaction could not be completed as windows was close')
        }
      })
  } else {
    const res = axios.post('/api/student/enrollment', { courseId: props.course, paid: 1 })
    //reload page on successful enrollment
    router.go(0)
  }

}

</script>

<template>
    <button @click.prevent="handleClick(props.email, props.amount)" class="bg-blue-500 block w-[200px] text-lg mt-10 mx-auto rounded py-4 px-6 text-white"><slot /></button>

</template>

<style scoped>

</style>

<template>
  <div class="border-b-1 pb-4">
    <h2>Sign in with Google</h2>
    <div ref="googleButton"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, defineEmits } from 'vue';
import axios from 'axios';

const emits = defineEmits(['success'])

const clientId = '1078148364649-8v697i1oo9e37j36flapdsqca8893ne4.apps.googleusercontent.com'; // Replace with your real client ID

const googleButton = ref(null);

const handleCredentialResponse = async (response) => {
  const idToken = response.credential;

  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/google`, { idToken });
    const data = res.data;

    emits('success', data)
  } catch (err) {
    console.error('Auth failed:', err);
  }
};

// Helper: wait for google.accounts.id to be available
function waitForGISReady() {
  return new Promise((resolve, reject) => {
    const maxWaitTime = 5000; // 5 seconds max wait
    const intervalTime = 50;
    let waited = 0;

    const interval = setInterval(() => {
      if (window.google && window.google.accounts && window.google.accounts.id) {
        clearInterval(interval);
        resolve();
      } else {
        waited += intervalTime;
        if (waited >= maxWaitTime) {
          clearInterval(interval);
          reject(new Error('Google Identity Services failed to load in time.'));
        }
      }
    }, intervalTime);
  });
}

onMounted(async () => {
  // Make the callback globally available
  window.handleCredentialResponse = handleCredentialResponse;

  try {
    await waitForGISReady();

    if (googleButton.value) {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(googleButton.value, {
        theme: 'filled_blue',
        size: 'large',
        type: 'standard',
        shape: 'pill',
        text: 'signin_with',
        logo_alignment: 'left',
      });

      // Optional: auto prompt sign-in
      // window.google.accounts.id.prompt();
    }
  } catch (error) {
    console.error(error.message);
    alert('Failed to load Google login script. Please try again later.');
  }
});

onBeforeUnmount(() => {
  if (window.handleCredentialResponse) {
    delete window.handleCredentialResponse;
  }
});
</script>

<style scoped>
/* Optional styling */
</style>


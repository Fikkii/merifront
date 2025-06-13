import axios from 'axios'

export async function fetchModules() {
  try {
    const res = await axios.get('/api/modules')

    if (res.status == 200) {
        const data = await res.data
        return data
    }
  } catch (e) {
    console.error('Caught error:', e);
  }
}

export async function fetchCourses() {
  try {
    const res = await axios.get('/api/courses')

    if (res.status == 200) {
        const data = await res.data
        return data
    }
  } catch (e) {
    console.error('Caught error:', e);
  }
}

export async function fetchTopics() {
  try {
    const res = await axios.get('/api/topics')

    if (res.status == 200) {
        const data = res.data
        return data
    }
  } catch (e) {
    console.error('Caught error:', e);
  }
}


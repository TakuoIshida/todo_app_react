import { getTest } from '@/utils/functions'
import React from 'react'
type confirmType = {
  value: number
  detail: string
}

export async function getStaticProps() {
  const api_url = 'https://covid19.mathdro.id/api'
  const json = await getTest(api_url)
  const confirmed: confirmType = await json.confirmed
  return {
    props: { confirmed },
  }
}

const ssg = ({ confirmed }: { confirmed: confirmType }) => {
  return (
    <div>
      <p>{confirmed.value}</p>
      <p>{confirmed.detail}</p>
    </div>
  )
}

export default ssg

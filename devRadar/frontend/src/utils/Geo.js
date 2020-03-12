let ob = {}
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords
      
      ob.latitude = latitude
      ob.longitude = longitude
   
    },
    (err) => {
      alert(err)
    },
    {
      timeout: 30000
    }
  )

export default ob
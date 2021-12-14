while(1) {
  $temp = Get-Random -Min 12 -Max 40
  $hum = Get-Random -Min 20 -Max 100
  mosquitto_pub -t "temperature" -m $temp
  Write-Host("Temperature: $temp, Humidity: $hum")
  # mosquitto_pub -t "humidity" -m $hum
  sleep 1
}

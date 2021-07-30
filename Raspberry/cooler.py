from gpiozero import CPUTemperature
import RPi.GPIO as gpio
import time

gpio.setwarnings(False)
gpio.setmode(gpio.BCM)
gpio.setup(17, gpio.OUT)

while True:
    tfile = open('/sys/class/thermal/thermal_zone0/temp')
    temp = float(tfile.read())
    tempC = temp/1000
#    cpu = CPUTemperature()
#    n = float(cpu)
#    print(cpu.temperature)
    if tempC > 50:
        gpio.output(17, gpio.HIGH)
        time.sleep(300)
    else:
        gpio.output(17, gpio.LOW)

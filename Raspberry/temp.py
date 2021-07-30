import time
while True:
    # Temperatura
    tfile = open('/sys/class/thermal/thermal_zone0/temp')
    temp = str((float(tfile.read()))/1000)
    print(temp)
    time.sleep(1)

serial.redirect_to_usb()
width = 17
height = 7
rows = []
cols = []
last_led_toggle = 0
"""

for row in height:
rows[row] = []
for col in width:
if col > width / 2:
cols[col] = True
else:
cols[col] = False

"""
"""

for row in rows:
for col in cols:
if col:
scrollbit.set_pixel(col, row, 128)
scrollbit.show()

row = 0
while row < scrollbit.rows():
col = 0
while col < scrollbit.cols() / 2:
#scrollbit.clear()
scrollbit.setPixel(col, row, 128)
scrollbit.show()
col += 1
row += 1

"""

def on_forever():
    if last_led_toggle2 + 1000 < control.millis():
        serial.write_line("")
        led.toggle(0, 0)
        last_led_toggle2 = control.millis()
    led.toggle(4, 4)
    scrollbit.clear()
    scrollbit.show()
basic.forever(on_forever)

control.millis()
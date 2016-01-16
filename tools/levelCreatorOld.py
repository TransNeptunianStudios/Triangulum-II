from PIL import Image
from random import randrange

im = Image.open("newLevel.png") #Can be many different formats.
pix = im.load()

# Read from Image
# Asteroids, 22 (RGB: 155 173 163) light Grey
# Scout    , 27 (RGB: 172 50 50)   Red
# Mine    , 17 (RGB: 91 110 255)   Blue

# write to new newLevel.yaml
file = open("newLevel.json", "w")
file.truncate()

w, h = im.size #Get the width and hight of the image for iterating over
for y in range(0, h):
	for x in range(0, w):
		if pix[x, y] == 22 :
			file.write("\'spawn_time\': 1000.0, \'start_x\': 400, \'start_speed\': 20, \'type\': \'basic_asteroid\'\n");
		#elif pix[x, y] == 27 :
		#	Scouts.append([x / 10.0, 32 * abs(y - h + 1)]);
		#elif pix[x, y] == 17 :
		#	Mines.append([x / 10.0, 32 * abs(y - h + 1)]);
file.close()

from PIL import Image
from random import randrange
import random

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
gameX = 800 - 60;
file.write("newLevel = [");
for y in range(h-1, 0, -1):
	for x in range(0, w):
		if pix[x, y] != 0:
			file.write("{\'spawn_time\': " + str((h-y) * random.uniform(1000.0, 1000.0)) + ",");
			file.write( "\'start_x\': " + str(30 + x * gameX / random.uniform(9.5, 10.5) ) + ", ");
			file.write( "\'start_speed\': 20, ");
			if pix[x, y] == 17 : #blue
				file.write( "\'type\': \'mine\'},\n");
			elif pix[x, y] == 22 : #gray
				file.write( "\'type\': \'basic_asteroid\'},\n");
			elif pix[x, y] == 27 : #red
				file.write( "\'type\': \'enemy1\'},\n");
			else :
				print "whaat? " + str(pix[x, y]);

file.write("];");
		#elif pix[x, y] == 27 :
		#	Scouts.append([x / 10.0, 32 * abs(y - h + 1)]);
		#elif pix[x, y] == 17 :
		#	Mines.append([x / 10.0, 32 * abs(y - h + 1)]);
file.close()

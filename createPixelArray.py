import numpy as np
from PIL import Image
from json import JSONEncoder
import json

img1 = Image.open('worldReligionMap.jpg')

pixels = np.array(img1)

pixels[np.all(pixels == (255, 0, 0), axis=-1)] = (0,0,0)

img2 = Image.fromarray(pixels)

class NumpyArrayEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return JSONEncoder.default(self, obj)

numpyArray = np.array(img2)


numpyData = {"arrayOne": numpyArray}
with open("img.json", "w") as write_file:
    json.dump(numpyData, write_file, cls=NumpyArrayEncoder)
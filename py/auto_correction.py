import sys
from gingerit.gingerit import GingerIt

text = sys.argv[1]

parser = GingerIt()
print(parser.parse(text))
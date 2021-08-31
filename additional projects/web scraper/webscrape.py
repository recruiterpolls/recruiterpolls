from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup



my_url = 'https://www.newegg.ca/Desktop-Graphics-Cards/SubCategory/ID-48'

uClient = uReq(my_url)
pg_html = uClient.read()
uClient.close()

page_soup = soup(pg_html, "html.parser")

containers = page_soup.findAll("div", {"class":"item-container"})


def main():
	card_data = []

	max_price = 900
	count = 0
	for container in containers:
		
		make = container.a.img["title"]
		geegee = container.findAll("li", {"class":"price-ship"})
		shipping_price = geegee[0].text.strip()

		before_taxes = 	container.find("li", class_= 'price-current').strong.text
		bb = before_taxes.replace(',', '')
		small_sub = container.find("li", class_= 'price-current').sup.text
		#print(float(small_sub))
		
	
		intb = int(float(bb)) + float(small_sub)
		

		gst = float("{:10.4f}".format(intb * 0.05))
		pst = float("{:10.4f}".format(intb * 0.07))
		grand_total = intb + gst + pst
		grand_total = float("{:10.2f}".format(grand_total))

		
		
		if(grand_total <= max_price):
			#print("make: " + make)
			#print()
			#print("shipping price " + shipping_price)
			#print(grand_total)
			card_data.append((grand_total, make, shipping_price))

			count += 1
	card_data = sorted(tuple(card_data))
	print("you have ",count , "graphics cards in your price range on", my_url,"\n")

	print_card_data_sorted(card_data)

def print_card_data_sorted(card_data):
	for x in card_data:
		print(x, '\n')
		



if __name__ == '__main__':
	main()

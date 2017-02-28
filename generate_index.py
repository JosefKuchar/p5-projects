from glob import glob
import io
dirs = glob("*/")
html = "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><title>Josef Kuchař - p5 and processing</title>"
html += "<meta name='viewport' content='width=device-width, initial-scale=1'>"
html += "<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' integrity='sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u' crossorigin='anonymous'>"
html += "<link rel='stylesheet' href='index.css'>"
html += "</head><body><div class='container'><h1 class='text-center'>P5 and Processing projects</h1><a class='center-block text-center' href='https://github.com/JosefKuchar/p5-projects'>https://github.com/JosefKuchar/p5-projects</a><nav><ul>"

for directory in dirs:
    name = directory.replace("/", "").replace("\\", "")
    html += "<li><a href='" + name + "'>" + name + "</a></li>"

html += "</ul></nav></div></body></html>"

with io.open('index.html','w',encoding='utf8') as f:
    f.write(html)

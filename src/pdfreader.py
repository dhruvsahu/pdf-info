from pypdf import PdfReader

reader = PdfReader('example.pdf')
page = reader.pages[0]
print(page.extract_text())
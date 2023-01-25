FROM python:3.10-alpine

LABEL Maintainer="Ismael"

WORKDIR /python

COPY . /python/

EXPOSE 5000:5000

RUN pip install -r requirements.txt

CMD [ "python", "-m", "flask", "run", "--host=0.0.0.0"]
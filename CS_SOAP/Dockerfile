FROM mcr.microsoft.com/dotnet/sdk:6.0-alpine3.16

LABEL Maintainer="Ismael"

WORKDIR /CS

COPY . /CS/

EXPOSE 5231
EXPOSE 7112
EXPOSE 80

RUN dotnet add package SoapCore
RUN dotnet dev-certs https

CMD [ "dotnet", "run" ]
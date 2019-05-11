FROM ruby:2.5 as builder

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ENV LANG C.UTF-8

COPY Gemfile Gemfile.lock ./
RUN bundle install 

COPY . . 
RUN jekyll build 

FROM nginx:alpine
COPY --from=builder /usr/src/app/_site /usr/share/nginx/html 

EXPOSE 80

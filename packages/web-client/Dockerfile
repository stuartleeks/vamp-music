FROM nginx
COPY nginx.conf.template /etc/nginx/conf.d/nginx.conf.template
COPY dist /etc/nginx/html
CMD /bin/bash -c "envsubst < /etc/nginx/conf.d/nginx.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"

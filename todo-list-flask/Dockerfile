FROM ubuntu:14.04

ADD sources.list /etc/apt/sources.list
ADD pip.conf ~/.pip/pip.conf

# Update OS
# RUN sed -i 's/# \(.*multiverse$\)/\1/g' /etc/apt/sources.list
RUN apt-get update
RUN apt-get -y upgrade

# Install Python
RUN apt-get install -y python-dev python-pip

# Add requirements.txt
ADD requirements.txt /webapp/requirements.txt

# Install gunicorn Python web server
RUN pip install gunicorn==19.6.0
# Install app requirements
RUN pip install -r /webapp/requirements.txt

# Create app directory
ADD . /webapp

# Set the default directory for our environment
ENV HOME /webapp
WORKDIR /webapp

# Expose port 5000 for gunicorn
EXPOSE 5000

ENTRYPOINT ["gunicorn", "-w", "2", "index:app", "-b", "0.0.0.0:5000", "-n", "docker-flask", "--timeout", "45", "--max-requests", "10000"]
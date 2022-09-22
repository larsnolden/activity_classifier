import socket
import sys

# data settings
data_size = 256  # sending 16 bytes = 128 bits (binary touch states, for example)

# server settings
HOST = '192.168.1.76'
PORT = 8888
server_address = (HOST, 8888)

# start up server
print('Setting up server on:', server_address)
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
try:
    server_socket.bind(server_address)
except socket.error as err:
    print("Bind Filed, Error Code", str(err[0]), " Message: ", err[1])

print("Socket Bind Success!")
server_socket.listen(10)
print("Socket Listening")

# wait for connection
print('Waiting for a client connection...')
connection, client_address = server_socket.accept()
print('Connected to:', client_address)


# data formatting
def data2binary(data):
    return ' '.join([format(ord(i), 'b').zfill(8) for i in data])


# listen for data for forever
while True:
    data = connection.recv(data_size)
    received_string = data.decode("utf-8")
    if received_string == "":
        print('Received', data.decode("utf-8"))

# process data

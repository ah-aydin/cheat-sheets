Allow the usage of custom virtual hosts
==========================================
By default, xampp in ubuntu won't use the httpd-vhosts.conf file (the location of the virtual hosts), therefore we need to indicate that this file will be included during the runtime of apache. Open with your favorite code editor the httpd.conf file located tipically in /opt/lampp/etc or just execute the following command in your terminal to open a simple editor:

    sudo gedit /opt/lampp/etc/httpd.conf

Now locate yourself in (about) the line 487 where you probably will find the following lines:

    # Virtual hosts
    #Include etc/extra/httpd-vhosts.conf

As you can see, the Include statement that includes the httpd-vhosts.conf file is commented. Proceed to modify the line uncommenting that line:

    # Virtual hosts
    Include etc/extra/httpd-vhosts.conf


Create a custom domain in the hosts file of your system
=======================================================
    sudo gedit /etc/hosts

And proceed to add your custom host. In this example, our ip will be 127.0.0.5 and the domain myawesomeproject. So finally, our hosts file will look like:

    127.0.0.1	localhost
    127.0.0.5	myawesomeproject

    # don't touch other existent values
    # The following lines are desirable for IPv6 capable hosts
    ::1     ip6-localhost ip6-loopback
    fe00::0 ip6-localnet
    ff00::0 ip6-mcastprefix
    ff02::1 ip6-allnodes
    ff02::2 ip6-allrouters

Create your first virtual host
==============================
Tipically, you need to create the virtual host in the httpd-vhosts.conf file located in /opt/lampp/etc/extra. Use your favorite editor to edit that file or just execute the following command to edit it in a terminal:

    sudo gedit /opt/lampp/etc/extra/httpd-vhosts.conf

And create your own virtual host in this file. As shown in our custom domain in the vhost file of the system, the port that we are going to use is 127.0.0.5, therefore our virtual host will be:

    <VirtualHost 127.0.0.5:80>
        DocumentRoot "/opt/lampp/htdocs/my-first-project"
        DirectoryIndex index.php

        <Directory "/opt/lampp/htdocs/my-first-project">
            Options All
            AllowOverride All
            Require all granted
        </Directory>
    </VirtualHost>

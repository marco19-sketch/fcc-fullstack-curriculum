#!/bin/bash

# System information script
echo "=== System Information ==="
echo "Hostname: $(hostname)"
echo "Kernel Version: $(uname -r)"
echo "Uptime: $(uptime -p)"
echo "Memory Usage:"
free -h
echo "Disk Usage:"
df -h /
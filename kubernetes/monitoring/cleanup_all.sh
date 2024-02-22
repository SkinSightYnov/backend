# cleanup_all.sh
echo "Starting cleanup of all components..."

echo "Cleaning up Prometheus State Metrics..."
cd state-metrics && ./cleanup.sh

echo "Cleaning up Node Exporter..."
cd ../node-exporter && ./cleanup.sh

echo "Cleaning up Grafana..."
cd ../grafana && ./cleanup.sh

echo "Cleaning up Loki..."
cd ../loki && ./cleanup.sh

echo "Cleaning up Promtail..."
cd ../promtail && ./cleanup.sh

echo "Cleaning up Alert Manager..."
cd ../alert-manager && ./cleanup.sh

echo "Cleaning up Prometheus..."
cd ../prometheus && ./cleanup.sh

echo "Cleanup of all components completed."

# node_exporter_cleanup.sh
echo "Starting cleanup of Node-exporter Kubernetes setup..."

echo "Deleting Node-exporter daemonset..."
kubectl delete -f node-exporter-daemonset.yaml

echo "Deleting Node-exporter service..."
kubectl delete -f node-exporter-service.yaml

echo "Cleanup of Node-exporter Kubernetes setup completed."

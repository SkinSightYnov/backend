# prom_state_metrics_cleanup.sh
echo "Starting cleanup of Prometheus State Metrics Kubernetes setup..."

echo "Deleting everything in the directory..."
kubectl delete -f .

echo "Cleanup of Prometheus State Metrics Kubernetes setup completed."

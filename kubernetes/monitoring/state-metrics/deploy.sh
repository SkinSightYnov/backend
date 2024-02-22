# prom_state_metrics_deploy.sh
echo "Starting Prometheus State Metrics Kubernetes setup..."

echo "Creating everything in the directory..."
kubectl apply -f .

echo "Prometheus State Metrics Kubernetes setup completed."

# grafana_cleanup.sh
echo "Starting cleanup of Grafana Kubernetes setup..."

echo "Deleting Grafana deployment..."
kubectl delete -f grafana-deployment.yaml

echo "Deleting Grafana service..."
kubectl delete -f grafana-service.yaml

echo "Deleting Grafana config map..."
kubectl delete -f grafana-configmap.yaml

echo "Cleanup of Grafana Kubernetes setup completed."

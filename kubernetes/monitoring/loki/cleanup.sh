# loki_cleanup.sh
echo "Starting cleanup of Loki Kubernetes setup..."

echo "Deleting Loki deployment..."
kubectl delete -f loki-deployment.yaml

echo "Deleting Loki service..."
kubectl delete -f loki-service.yaml

echo "Deleting Loki config map..."
kubectl delete -f loki-configmap.yaml

echo "Cleanup of Loki Kubernetes setup completed."
